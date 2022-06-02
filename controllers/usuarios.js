const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { QueryTypes } = require("sequelize");
const db = require("../database/conexion");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  // const usuarios = await db.query(
  //   `SELECT * FROM usuarios LIMIT ${limite} OFFSET ${desde}`,
  //   {
  //     type: QueryTypes.SELECT,
  //   }
  // );
  // const total =await Usuario.count(
  //   {
  //     where: { estado: 1 },
  //   },
  //   { type: QueryTypes.SELECT }
  // );
  const { count: total, rows: usuarios } = await Usuario.findAndCountAll({
    where: { estado: true },
  });
  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol = "USER_ROLE" } = req.body;
  console.log("rol", rol);
  const usuarioi = new Usuario({ id: uuidv4(), nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuarioi.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuarioi.save();

  // Generar el JWT
 const  usuario = await Usuario.findByPk(usuarioi.id);
  // const token = await generarJWT(usuario.id);

  res.json(
    usuario,
    // token,
  );
};

const usuariosPut = async (req, res = response) => {
  const { id: idu } = req.params;
  console.log(idu);
  const { id, password, correo, ...resto } = req.body;
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  let usuario = await Usuario.update(resto, {
    where: { id: idu },
  });
  usuario = await Usuario.findByPk(idu);
  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.update({ estado: false }, { where: { id } });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
