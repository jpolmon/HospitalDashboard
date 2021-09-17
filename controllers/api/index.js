const router = require("express").Router();
const doctorViewRoutes = require("./doctorViewRoute");
const patientViewRoutes = require("./patientViewRoute");

router.use("/doctor", doctorViewRoutes);
router.use("/patient", patientViewRoutes);

module.exports = router;
