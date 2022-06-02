const { DataTypes } = require("sequelize");
const db = require("../database/conexion");

const Mantenimiento = db.define("mnttos", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
  },
  idauto: {
    type: DataTypes.UUID,
  },
  idCat: {
    type: DataTypes.UUID,
  },
  idsubcat: {
    type: DataTypes.UUID,
  },
  nota: {
    type: DataTypes.STRING,
  },
  dia: {
    type: DataTypes.STRING,
  },
  archivo: {
    type: DataTypes.STRING,
  },
  id_user: {
    type: DataTypes.STRING,
  },
});
module.exports =Mantenimiento;