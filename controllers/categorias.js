const { response } = require("express");
const { Categoria } = require("../models");
const { QueryTypes } = require("sequelize");
const db = require("../database/conexion");
const obtenerCategorias = async (req, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const categorias = await db.query(
    `SELECT * FROM categoria LIMIT ${limite} OFFSET ${desde}`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const total = await Categoria.count(
    {
      where: { estado: 1 },
    },
    { type: QueryTypes.SELECT }
  );

  res.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByPk(id);

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario.id,
  };

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
};

const actualizarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario.id;

  // const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  let categoria = await Categoria.update(data, {
    where: { id },
  });
  categoria = await Categoria.findByPk(id);
  res.json(categoria);
};

const borrarCategoria = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await Categoria.update(
    { estado: false },
    {
      where: { id },
    }
  );

  res.json(categoriaBorrada);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
