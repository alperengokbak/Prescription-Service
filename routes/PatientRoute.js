import Router from "express";
import { createPatient, createPatients, getAllPatients } from "../controllers/PatientController.js";

const router = Router();

router.get("/getAllPatients", getAllPatients);
router.post("/createPatient", createPatient);
router.post("/createPatients", createPatients);

export default router;
