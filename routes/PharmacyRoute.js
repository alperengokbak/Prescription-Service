import Router from "express";
import { isAuthorized } from "../middleware/isAuthorized.js";
import {
  loginPharmacy,
  createPharmacy,
  deletePharmacy,
  getAllPharmacy,
  createPrescription,
  checkPharmacy,
  searchPatientByIdNumber,
  searchPrescription,
} from "../controllers/PharmacyController.js";

const router = Router();

router.get("/searchPrescription", searchPrescription);
router.post("/searchPatientByIdNumber", searchPatientByIdNumber);
router.get("/getAllPharmacy", isAuthorized, getAllPharmacy);
router.get("/checkPharmacy", checkPharmacy);
router.post("/loginPharmacy", loginPharmacy);
router.post("/createPharmacy", createPharmacy);
router.post("/createPrescription", isAuthorized, createPrescription);
router.delete("/deletePharmacy", deletePharmacy);

export default router;
