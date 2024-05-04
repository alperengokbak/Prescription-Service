import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* async function addMedicineFromExcel(fileBuffer) {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { range: 2, header: 3 }); // Start from the third row for headers

    // Extract column names from the third row
    const columnNames = Object.keys(data[0]);

    // Add a "price" column header
    columnNames.push("price");

    // Add random prices to each row
    for (let i = 0; i < data.length; i++) {
      const randomPrice = Math.floor(Math.random() * (200 - 60 + 1) + 60);
      data[i]["price"] = randomPrice;
    }

    const mappedData = data.map((item) => {
      return {
        name: item["Medicine Name"],
        barcode: String(item["Barcode"]),
        atcCode: item["ATC Code"],
        atcName: item["ATC Name"],
        companyName: item["Company Name"],
        prescriptionType: item["Prescription Type"],
        status: item["Status"],
        price: item["price"],
      };
    });

    // Save data to the database
    await prisma.medicine.createMany({
      data: mappedData,
    });

    return { success: true, message: "Data imported successfully" };
  } catch (error) {
    console.error("Error during Excel file upload:", error);
    return { success: false, message: "Internal server error" };
  } finally {
    await prisma.$disconnect();
  }
} */

async function addMedicine(req, res) {
  const { name, price } = req.body;

  try {
    if (!name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof name !== "string" || typeof price !== "number") {
      return res.status(400).json({ error: "Invalid data types" });
    }

    const medicine = await prisma.medicine.create({
      data: {
        name,
        price,
      },
    });

    return res.json(medicine);
  } catch (error) {
    console.log(error);
    res.json({ error: "Error encountered while adding medicine" });
  } finally {
    await prisma.$disconnect();
  }
}

export { addMedicineFromExcel, addMedicine };
