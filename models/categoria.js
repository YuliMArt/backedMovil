const { DataTypes } = require("sequelize");
const db = require("../database/conexion");

const Categoria = db.define("categoria", {
  nombre: {
    type: DataTypes.STRING,
  },
  estado: {
    type: DataTypes.BOOLEAN,
  },
  usuario: {
    type: DataTypes.INTEGER,
  },
});

module.exports =  Categoria ;
