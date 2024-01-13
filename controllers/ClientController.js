import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function searchMedicine(req, res) {
  const { name } = req.body;
  let uppercaseName = "";

  try {
    if (typeof name === "string") {
      uppercaseName = name.toUpperCase();
    } else {
      console.error("name is not a string:", name);
    }

    if (!uppercaseName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof uppercaseName !== "string") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    const medicine = await prisma.medicine.findMany({
      where: {
        name: {
          contains: uppercaseName,
        },
      },
    });

    return res.json(medicine);
  } catch (error) {
    console.log(error);
    res.json({ error: "Error encountered while searching" });
  } finally {
    await prisma.$disconnect();
  }
}

async function searchAllMedicine(req, res) {
  try {
    const medicine = await prisma.medicine.findMany();
    return res.json(medicine);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error encountered while searching all medicine" });
  } finally {
    await prisma.$disconnect();
  }
}

await prisma.$disconnect();
export { searchMedicine, searchAllMedicine };
