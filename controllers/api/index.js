const router = require("express").Router();
const doctorViewRoutes = require("./doctorViewRoute");
const patientViewRoutes = require("./patientViewRoute");
const treatmentViewRoutes = require("./treatmentViewRoute");

router.use("/doctors", doctorViewRoutes);
router.use("/patients", patientViewRoutes);
router.use("/treatments", treatmentViewRoutes);

module.exports = router;
