const router = require("express").Router();
const { Doctor, Patient, Medicine } = require("../models");
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
    const doctorData = await Doctor.findByPk(req.session.doctor_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Patient,
          // attributes: ["firstName, lastName"],
        },
      ],
    });
    const doctor = doctorData.get({ plain: true });

    const patientData = await Patient.findAll({
      include: [
        {
          model: Patient,
          Treatment,
          // attributes: ["firstName, lastName"],
        },
      ],
    });
    const patients = patientData.get({ plain: true });
    // res.json(doctor);
    res.render("doctorView", {
      ...doctor,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/patientView", async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.session.patient_id, {
      attributes: { exclude: ["password"] },
    });

    const patient = patientData.get({ plain: true });

    res.render("patientView", {
      ...patient,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Patient, Medicine }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
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

// router.get('/signup', (req, res) => {
//   if (req.session.logged_in) {
//     res.redirect('/dashboard');
//     return;
//   }

//   res.render('signup');
// });

module.exports = router;
