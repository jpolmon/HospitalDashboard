// const router = require("express").Router();
// const { Doctor, Patient, Medicine, Treatment } = require("../../models");

// //create treatment
// router.post('/', withAuth, async (req, res) => {
//     try {
//       const treatmentData = await Treatment.create(req.body);
//       res.status(200).json(treatmentData);
//     } catch (err) {
//       res.status(400).json(err);
//     }
// });