const router = require("express").Router();
const { Doctor, Patient, Medicine, Treatment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("login", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/doctorView", withAuth, async (req, res) => {
  try {
    const availableMedications = await Medicine.findAll();
    const availableMedicine = availableMedications.map((med) =>
      med.get({ plain: true })
    );

    const doctorData = await Doctor.findByPk(req.session.doctor_id, {
      attributes: { exclude: ["password"] },
    });
    const doctor = doctorData.get({ plain: true });

    const patientData = await Patient.findAll({
      where: { doctor_id: req.session.doctor_id },
    });

    const patient = patientData.map((singlePatient) =>
      singlePatient.get({ plain: true })
    );

    const treatmentData = [];
    for (const pat of patientData) {
      treatmentData.push(
        await Treatment.findAll({ where: { patient_id: pat.id } })
      );
    }

    res.render("doctorView", {
      ...doctor,
      allMedications: availableMedicine,
      patients: patient,
      // medicine: medications,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/doctorView/:patientId", withAuth, async (req, res) => {
  try {
    const doctorData = await Doctor.findByPk(req.session.doctor_id, {
      attributes: { exclude: ["password"] },
    });

    const doctor = doctorData.get({ plain: true });
    const availableMedications = await Medicine.findAll();
    const availableMedicine = availableMedications.map((med) =>
      med.get({ plain: true })
    );

    const patientData = await Patient.findAll({
      where: { doctor_id: req.session.doctor_id },
    });

    const patient = patientData.map((singlePatient) =>
      singlePatient.get({ plain: true })
    );

    const thisPatientData = await Patient.findOne({
      where: {
        doctor_id: req.session.doctor_id,
        id: req.params.patientId,
      },
    });

    const thisPatient = thisPatientData.get({ plain: true });

    const thisTreatmentData = await Treatment.findAll({
      where: { patient_id: req.params.patientId }
    });

    const thisTreatment = thisTreatmentData.map((treatment) => 
      treatment.get({ plain: true })
    );

    const medications = [];
    for (const treatment of thisTreatment) {
      medications.push(await Medicine.findByPk(treatment.medicine_id));
    }

    const medicine = medications.map((medication) =>
      medication.get({ plain: true })
    );

    res.status(200).json(medicine)
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

module.exports = router;
