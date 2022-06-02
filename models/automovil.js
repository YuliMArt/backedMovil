const { DataTypes } = require("sequelize");
const db = require("../database/conexion");

const Automovil = db.define("vehiculos", {
  id: {
    type: DataTypes.UUID,
    unique: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
  },
  marca: {
    type: DataTypes.STRING,
  },
  modelo: {
    type: DataTypes.STRING,
  },
  placas: {
    type: DataTypes.STRING,
  },
  kilometraje: {
    type: DataTypes.STRING,
  },
  foto: {
    type: DataTypes.STRING,
  },
  nota: {
    type: DataTypes.STRING,
  },
  estado: {
    type:DataTypes.BOOLEAN,
  }
});

module.exports = Automovil;
