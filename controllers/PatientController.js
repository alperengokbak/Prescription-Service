import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createPatient(req, res) {
  const { fullName, idNumber } = req.body;

  try {
    if (!fullName || !idNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof fullName !== "string" || typeof idNumber !== "string") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    // Validate that idNumber contains only numeric characters
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(idNumber)) {
      return res.status(400).json({ error: "idNumber must contain only numeric characters" });
    }

    const patient = await prisma.patient.create({
      data: {
        fullName,
        idNumber,
      },
    });

    return res.json(patient);
  } catch (error) {
    console.log(error);
    res.json({ error: "Error encountered while creating patient" });
  } finally {
    await prisma.$disconnect();
  }
}

async function createPatients(req, res) {
  const clientsData = req.body;

  try {
    const createdClients = await prisma.patient.createMany({
      data: clientsData.map(({ fullName, idNumber }) => ({
        fullName,
        idNumber,
      })),
    });

    return res.json({ numberOfClients: createdClients, status: "success" });
  } catch {
    return res.json({ status: "error" });
  } finally {
    await prisma.$disconnect();
  }
}

async function getAllPatients(req, res) {
  const patients = await prisma.patient.findMany();

  return res.json(patients);
}

export { createPatient, createPatients, getAllPatients };
