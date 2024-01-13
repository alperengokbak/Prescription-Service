import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendToRabbitMQ } from "../workers/emailWorker.js";

const prisma = new PrismaClient();

async function createPharmacy(req, res) {
  const { name, username, password } = req.body;

  try {
    const existingPharmacy = await prisma.pharmacy.findUnique({
      where: {
        username,
      },
    });
    if (existingPharmacy) {
      return res.status(400).json({ error: "Username already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newPharmacy = await prisma.pharmacy.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });
    res.json({
      newPharmacy: {
        name: newPharmacy.name,
        username: newPharmacy.username,
      },
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Unable to register" });
  } finally {
    await prisma.$disconnect();
  }
}

async function loginPharmacy(req, res) {
  const { username, password } = req.body;

  try {
    const existingPharmacy = await prisma.pharmacy.findUnique({
      where: {
        username,
      },
    });
    if (!existingPharmacy) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingPharmacy.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: existingPharmacy.id }, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
    res.json({
      existingPharmacy: {
        name: existingPharmacy.name,
        username: existingPharmacy.username,
      },
      token,
      status: "Success",
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Unable to login" });
  } finally {
    await prisma.$disconnect();
  }
}

async function deletePharmacy(req, res) {
  const { id } = req.body;

  const pharmacy = await prisma.pharmacy.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.json(pharmacy);
}

async function getAllPharmacy(req, res) {
  const pharmacies = await prisma.pharmacy.findMany();

  return res.json(pharmacies);
}

async function checkPharmacy(req, res) {
  const token = req.header("authorization").split(" ")[1];
  if (!token) return res.status(401).json({ status: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const findPharmacy = await prisma.pharmacy.findUnique({
      where: {
        id: decoded.id,
      },
    });
    if (findPharmacy) {
      return res.json({
        pharmacy: {
          id: findPharmacy.id,
          name: findPharmacy.name,
          userName: findPharmacy.userName,
          medicines: findPharmacy.medicines,
          prescriptions: findPharmacy.Prescription,
        },
      });
    } else {
      return res.status(401).json({ error: "Not authorized" });
    }
  } catch (error) {
    console.log("gdgf", res.rows);
    console.log(error);
    return res.status(401).json({ error: "Not authorized" });
  } finally {
    await prisma.$disconnect();
  }
}

async function searchPatientByIdNumber(req, res) {
  const { idNumber } = req.body;

  try {
    if (!idNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof idNumber !== "string") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(idNumber)) {
      return res.status(400).json({ error: "idNumber must contain only numeric characters" });
    }

    const patient = await prisma.patient.findUnique({
      where: {
        idNumber: idNumber,
      },
    });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    return res.json({
      patient: {
        fullName: patient.fullName,
        idNumber: patient.idNumber,
        prescription: patient.Prescription,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error encountered while searching" });
  } finally {
    await prisma.$disconnect();
  }
}

async function createPrescription(req, res) {
  const { totalSalesAmount } = req.body;
  const { id } = req.user;
  const today = new Date();
  const previousNight = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

  try {
    if (!totalSalesAmount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof totalSalesAmount !== "number") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    if (totalSalesAmount < 0) {
      return res.status(400).json({ error: "totalSalesAmount must be a positive number" });
    }

    if (!id) {
      return res.status(400).json({ error: "Not Authorized!" });
    }

    const prescription = await prisma.prescription.create({
      data: {
        pharmacyId: id,
        totalSalesAmount,
      },
    });

    const prescriptions = await prisma.prescription.findMany({
      where: {
        pharmacyId: id,
        date: {
          gte: previousNight,
        },
      },
    });

    const totalAmount = prescriptions.reduce((sum, prescription) => sum + prescription.totalSalesAmount, 0);

    const pharmacyName = await prisma.pharmacy.findUnique({
      where: {
        id: id,
      },
    });

    const message = {
      pharmacyName: pharmacyName.name,
      numberOfPrescriptions: prescriptions.length,
      totalAmount,
    };

    await sendToRabbitMQ(message);

    return res.json({ prescription, message: "Prescription created successfully, email will be sent later tonight!" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error encountered while creating prescription" });
  } finally {
    await prisma.$disconnect();
  }
}

async function searchPrescription(req, res) {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof id !== "number") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    if (id < 0) {
      return res.status(400).json({ error: "id must be a positive number" });
    }

    const prescription = await prisma.prescription.findUnique({
      where: {
        id: id,
      },
    });

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    return res.json({
      prescription: {
        date: prescription.date,
        totalSalesAmount: prescription.totalSalesAmount,
        pharmacy: prescription.pharmacyId,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Error encountered while searching" });
  } finally {
    await prisma.$disconnect();
  }
}

export {
  loginPharmacy,
  createPharmacy,
  deletePharmacy,
  getAllPharmacy,
  createPrescription,
  checkPharmacy,
  searchPatientByIdNumber,
  searchPrescription,
};
