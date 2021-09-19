const router = require("express").Router();
const { Doctor, Patient } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/doctorView", async (req, res) => {
  try {
    const doctorData = await Doctor.findByPk(req.params.doctor_id, {
      attributes: { exclude: ["password"] },
    });

    const doctor = doctorData.get({ plain: true });

    res.render("doctorView", {
      ...doctor,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/patientView", withAuth, async (req, res) => {
  try {
    // Find the logged in patient based on the session ID
    const patientData = await Patient.findByPk(req.session.patient_id, {
      attributes: { exclude: ["password"] },
    });

    const patient = patientData.get({ plain: true });

    const treatments = await Treatment.findAll({
      where: { patient_id: req.session.patient_id },
    });

    const medications = [];
    for (const treatment of treatments) {
      medications.push(await Medicine.findByPk(treatment.medicine_id));
    }

    const medicine = medications.map((medication) =>
      medication.get({ plain: true })
    );

    let totalValue = 0.0;
    for (const medicine of medications) {
      totalValue += medicine.price;
    }

    res.render("patientView", {
      patient: patient,
      medications: medicine,
      total: totalValue.toFixed(2),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
