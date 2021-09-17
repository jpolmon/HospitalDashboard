const router = require("express").Router();

// const loginRoutes = require("./loginRoute");
const doctorViewRoutes = require("./doctorViewRoute");
const patientViewRoutes = require("./patientViewRoute");

// router.use("/login", loginRoutes);
router.use("/doctor", doctorViewRoutes);
router.use("/patient", patientViewRoutes);

module.exports = router;
