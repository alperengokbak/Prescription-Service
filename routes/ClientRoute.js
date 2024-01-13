import Router from "express";
import { searchMedicine, searchAllMedicine } from "../controllers/ClientController.js";

const router = Router();

router.get("/searchAllMedicine", searchAllMedicine);
router.post("/searchMedicine", searchMedicine);

export default router;
