import Router from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import { addMedicineFromExcel, addMedicine } from "../controllers/MedicineController.js";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addMedicine", isAuthorized, addMedicine);
router.post("/addManyMedicine", isAuthorized, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const result = await addMedicineFromExcel(req.file.buffer);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(500).json({ error: result.message });
  }
});

export default router;
