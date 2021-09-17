const router = require('express').Router();
const { Doctor, Patient } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  try {
    res.render("login", {
      logged_in : req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/doctorView', async (req, res) => {
  try {
    const doctorData = await Doctor.findByPk(req.params.doctor_id, {
      attributes: { exclude: ["password"] },
    });

    const doctor = doctorData.get({ plain: true });

    res.render('doctorView', {
      ...doctor,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/patientView', async (req, res) => {
  try {
    const patientData = await Patient.findByPk(req.params.patient_id, {
      attributes: { exclude: ["password"] },
    });
        
    const patient = patientData.get({ plain: true });

    res.render('patientView', 
    {
      ...patient,
      logged_in: req.session.logged_in
    }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Patient, Medicine }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;