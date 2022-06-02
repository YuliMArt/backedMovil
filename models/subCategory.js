const { DataTypes } = require("sequelize");
const db = require("../database/conexion");
const SubCategory = db.define("subcategoria", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
  },
  id_cat: {
    type: DataTypes.UUID,
  
  },
  id_user: {
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  estado:{
    type: DataTypes.BOOLEAN
  }
});
module.exports = SubCategory;
