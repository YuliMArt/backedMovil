const { DataTypes } = require("sequelize");
const db = require("../database/conexion");

const Role = db.define("Role", {
    rol: {
        type: DataTypes.STRING,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = Role ;
