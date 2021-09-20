const Patient = require("./Patient.js");
const Medicine = require("./Medicine.js");
const Doctor = require("./Doctor.js");
const Treatment = require("./Treatment.js");

Doctor.hasMany(Patient, {
  foreignKey: "doctor_id",
  onDelete: "CASCADE",
});

Patient.belongsTo(Doctor, {
  foreignKey: "doctor_id",
});

Patient.belongsToMany(Medicine, {
  through: {
    model: Treatment,
    unique: false,
  },
  as: "patient_medicine",
});

Medicine.belongsToMany(Patient, {
  through: {
    model: Treatment,
    unique: false,
  },
  as: "prescription",
});

module.exports = { Patient, Medicine, Doctor, Treatment };
