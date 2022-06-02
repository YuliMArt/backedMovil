const { DataTypes } = require("sequelize");
const db = require("../database/conexion");

const Servicio = db.define("servicios", {
  categoria: {
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
    // required: [true, 'El nombre es obligatorio'],
    // unique: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    default: true,
    required: true,
  },

  descripcion: { type: DataTypes.STRING },
});

module.exports = Servicio;
