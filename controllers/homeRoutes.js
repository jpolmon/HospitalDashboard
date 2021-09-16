const router = require("express").Router();
const { Patient } = require("../models");
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

router.get("/patientView", withAuth, async (req, res) => {
  try {
    // Find the logged in patient based on the session ID
    const patientData = await Patient.findByPk(req.session.patient_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }, { model: Comment }],
    });

    const patient = patientData.get({ plain: true });

    res.render("patientView", {
      ...patient,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
