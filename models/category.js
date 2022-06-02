const { DataTypes } = require("sequelize");
const db = require("../database/conexion");
const Category = db.define("categories", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  status:{
    type: DataTypes.BOOLEAN
  }
});
module.exports = Category;
