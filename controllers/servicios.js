const { response } = require("express");
const { Servicio } = require("../models");
const { QueryTypes } = require("sequelize");

const db = require("../database/conexion");

const obtenerServicios = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const servicios = await db.query(
    `SELECT * FROM servicios where estado=1 LIMIT ${limite} OFFSET ${desde} `,
    {
      type: QueryTypes.SELECT,
    }
  );
  const total = await Servicio.count(
    {
      where: { estado: 1 },
    },
    { type: QueryTypes.SELECT }
  );

  res.json({
    total,
    servicios,
  });
};

const obtenerServicio = async (req, res = response) => {
  const { id } = req.params;
  const servicio = await Servicio.findByPk(id);

  res.json(servicio);
};

const crearServicio = async (req, res = response) => {
  const { ...body } = req.body;
  console.log(req.body);
  const servicioDB = await Servicio.findOne({
    where: { nombre: body.nombre.toUpperCase() },
  });

  if (servicioDB) {
    return res.status(400).json({
      msg: `El producto ${servicioDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario.id,
  };

  const servicio = new Servicio(data);

  // Guardar DB
  const nuevoServicio = await servicio.save();
  // await nuevoProducto
  //     .populate('usuario', 'nombre')
  //     .populate('categoria', 'nombre')
  //     .execPopulate();
  

  res.status(201).json(nuevoServicio);
};

const actualizarServicio = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario.id;

  let servicio = await Servicio.update(data, { where: { id } });
   servicio = await Servicio.findByPk(id);
  // await producto
  //     .populate('usuario', 'nombre')
  //     .populate('categoria', 'nombre')
  //     .execPopulate();

  res.json(servicio);
};

const borrarServicio = async (req, res = response) => {
  const { id } = req.params;
  const servicioBorrado = await Servicio.update(
    { estado: false },
    { where: { id } }
  );

  res.json(servicioBorrado);
};

module.exports = {
  crearServicio,
  obtenerServicios,
  obtenerServicio,
  actualizarServicio,
  borrarServicio,
};
