const { response } = require("express");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/conexion");
const { Auto } = require("../models");

const getAutomoviles = async (req, res = response) => {
  const { count: total, rows: vehiculos } = await Auto.findAndCountAll({where:{estado:true}});
  res.json({
    total,
    vehiculos,
  });
};
const obtenerAuto = async (req, res = response) => {
  const { id } = req.params;
  const automovil = await Auto.findByPk(id);

  res.json(automovil);
};
const crearAuto = async (req, res = response) => {
  const { ...body } = req.body;
  // Generar la data a guardar
  console.log(body.nombre.charAt(0).toUpperCase() + body.nombre.slice(1));
  const data = {
    ...body,
    id: uuidv4(),
    nombre: body.nombre.charAt(0).toUpperCase() + body.nombre.slice(1),
    marca: body.marca.toUpperCase(),
    placas: body.placas.toUpperCase(),
  };

  const automovil = new Auto(data);

  // Guardar DB
  const nuevoautomovil = await automovil.save();

  res.status(201).json(nuevoautomovil);
};

const actualizarAutomovil = async (req, res = response) => {
  const { id } = req.params;
  console.log(id);
  const {kilometraje,nota, modelo,...data } = req.body;
  console.log(req.body);
  let nombre,
  marca,
  placas;
  if (data.marca) {
   marca=data.marca.toUpperCase();
  }
  if (data.nombre) {
    nombre=data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1);
  }
  if (data.placas) {
    placas=data.placas.toUpperCase();
  }

  data.usuario = req.usuario.id;

  let automovil = await Auto.update({
    nombre,
    marca,
    modelo,
    placas,
    kilometraje,
    nota},
    { where: { id } }
  );
  automovil = await Auto.findByPk(id);
  console.log(automovil);
  res.json(automovil);
};
const borrarAuto = async (req, res = response) => {
  const { id } = req.params;
  const AutoBorrado = await Auto.update({ estado: false }, { where: { id } });

  res.json({ok:true,AutoBorrado});
};
module.exports = {
  getAutomoviles,
  obtenerAuto,
  crearAuto,
  actualizarAutomovil,
  borrarAuto,
};
