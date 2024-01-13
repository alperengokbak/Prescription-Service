import express from "express";

import patientRoute from "./routes/PatientRoute.js";
import pharmacyRoute from "./routes/PharmacyRoute.js";
import medicineRoute from "./routes/MedicineRoute.js";
import clientRoute from "./routes/ClientRoute.js";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

app.use("/medicine", medicineRoute);
app.use("/patient", patientRoute);
app.use("/pharmacy", pharmacyRoute);
app.use("/client", clientRoute);

app.listen(PORT, () => {
  console.log(`Prescription Service running on port ${PORT}`);
});
