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

module.exports = router;
