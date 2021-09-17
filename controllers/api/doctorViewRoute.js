const router = require("express").Router();
const { Doctor, Patient, Medicine } = require("../../models");
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

    res.render("doctorView", {
      ...staff,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
module.exports = router;
