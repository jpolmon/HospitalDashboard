const router = require("express").Router();
const { Doctor, Patient, Medicine, Treatment } = require("../../models");
const withAuth = require("../../utils/auth");

// Use withAuth middleware to prevent access to route
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Doctor.findByPk(req.session.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Patient, Medicine }],
    });

    const staff = userData.get({ plain: true });

    console.log(req.session);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/addTreatments/:id", async (req, res) => {
  try{
    let newTreatments = [];
    console.log(req.body);
    for(const medicine of req.body.medicationsToAdd) {
      const medication = await Medicine.findOne({
        where: { name: medicine }
      });
      
      const treatment = await Treatment.create({
        patient_id: req.body.id,
        medicine_id: medication.id
      }).catch((err) => {
        console.log(err);
      });

      newTreatments.push(treatment)
    }  
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post("/login", async (req, res) => {
  try {
    const doctorData = await Doctor.findOne({
      where: { email: req.body.email },
    });

    if (!doctorData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await doctorData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.doctor_id = doctorData.id;
      req.session.logged_in = true;

      res.json({ doctor: doctorData, message: "You are now logged in!" });
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

module.exports = router;
