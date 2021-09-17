const router = require("express").Router();
const { Doctor, Patient, Medicine } = require("../../models");
const withAuth = require("../../utils/auth");

// GET a single patient
router.get('/:id', async (req, res) => {
    try {
      const patientData = await Patient.findByPk(req.params.id, {
        include: [{ model: Medicine }]
      });
  
      if (!patientData) {
        res.status(404).json({ message: 'No patient found with this id!' });
        return;
      }
  
      res.status(200).json(patientData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// CREATE a patient
router.post('/', withAuth, async (req, res) => {
    try {
      const patientData = await Patient.create(req.body);
      res.status(200).json(patientData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// DELETE a patient
router.delete('/:id', async (req, res) => {
    try {
      const patientData = await Patient.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!patientData) {
        res.status(404).json({ message: 'No patient found with this id!' });
        return;
      }
  
      res.status(200).json(patientData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;