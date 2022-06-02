const { DataTypes } = require("sequelize");
const db = require("../database/conexion");

const UsuarioSchema = db.define("usuarios", {
  id:{
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: DataTypes.STRING,
    // required: [true, 'El correo es obligatorio'],
    // unique: true
  },
  password: {
    type: DataTypes.STRING,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: DataTypes.STRING,
  },
  rol: {
    type: DataTypes.STRING,
    required: true,
    default: "USER_ROLE",
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: DataTypes.BOOLEAN,
    default: true,
  },
  google: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
});

UsuarioSchema.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());

  delete values.password;
  return values;
};
module.exports = UsuarioSchema;
