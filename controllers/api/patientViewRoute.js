const router = require("express").Router();
const { Doctor, Patient, Medicine } = require("../../models");

// CREATE a patient
router.post("/", async (req, res) => {
  try {
    const patientData = await Patient.create(req.body);

    req.session.save(() => {
      req.session.patient_id = patientData.id;
      req.session.logged_in = true;

      res.status(200).json(patientData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const patientData = await Patient.findOne({
      where: { email: req.body.email },
    });

    if (!patientData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await patientData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.patient_id = patientData.id;
      req.session.logged_in = true;

      res.json({ patient: patientData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// GET a single patient
router.get("/:id", async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.params.id, {
      include: [{ model: Medicine }],
    });

    if (!patientData) {
      res.status(404).json({ message: "No patient found with this id!" });
      return;
    }

    res.status(200).json(patientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a patient
router.delete("/:id", async (req, res) => {
  try {
    const patientData = await Patient.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!patientData) {
      res.status(404).json({ message: "No patient found with this id!" });
      return;
    }

    res.status(200).json(patientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
