const Patient = require('./Patient');
const Medicine = require('./Medicine');
const Doctor = require('./Doctor');


Patient.hasMany(Doctor, {
  foreignKey: 'patient_id',
  onDelete: 'CASCADE'
});

Medicine.belongsTo(Patient, {
  foreignKey: 'patient_id'
});

module.exports = { Patient, Medicine, Doctor };
