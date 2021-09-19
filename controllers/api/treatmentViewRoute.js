const router = require("express").Router();
const { Treatment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, async (req, res) => {
  try {
    const newTreatment = await Treatment.create({ 
      ...req.body, 
      user_id: req.session.user_id,
    });
    res.status(200).json(newTreatment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const treatmentData = await Treatment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!treatmentData) {
      res.status(404).json({ message: "No treatment found with this id"})
    }
      res.status(200).json({ message: "Treatment Deleted" });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message,
    });
  }
  })

module.exports = router;