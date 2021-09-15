const sequelize = require("../config/connection");
const { Patient, Doctor, Medicine, Treatment } = require("../models");

const patientData = require("./patientData.json");
const doctorData = require("./doctorData.json");
const medicineData = require("./medicineData.json");
const treatmentData = require("./treatmentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const doctors = await Doctor.bulkCreate(doctorData, {
    individualHooks: true,
    returning: true,
  });

  const patients = [];
  for (const patient of patientData) {
    patients.push(
      await Patient.create({
        ...patient,
        doctor_id: doctors[Math.floor(Math.random() * doctors.length)].id,
      })
    );
  }

  await Medicine.bulkCreate(medicineData);

  await Treatment.bulkCreate(treatmentData);

  //   for (let i = 0; i < 15; i++) {
  //     const { id: ranPatientId } =
  //       patients[Math.floor(Math.random() * patients.length)];

  //     const { id: ranMedicineId } =
  //       medications[Math.floor(Math.random() * medications.length)];

  //     await Treatment.create({
  //       patient_id: ranPatientId,
  //       medicine_id: ranMedicineId,
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   }

  process.exit(0);
};

seedDatabase();
