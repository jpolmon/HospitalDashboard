const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Treatment model
class Treatment extends Model {}

// create fields/columns for Treatment model
Treatment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    medicine_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "medicine",
        key: "id",
        unique: false,
      },
    },
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "patient",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "treatment",
  }
);

module.exports = Treatment;
