const { response } = require("express");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/conexion");
const { Categories } = require("../models");

const getCategories = async (req, res = response) => {
  const { count: total, rows: categorias } = await Categories.findAndCountAll({where:{status:true}});

  res.json({
    total,
    categorias,
  });
};
const crearCategory = async (req, res = response) => {
  const { ...body } = req.body;
  const data = {
    ...body,
    id: uuidv4(),
  };
  const category = new Categories(data);
  const nuevocategory = await category.save();
  res.status(201).json(nuevocategory);
};
const obtenerCategoria = async (req, res = response) => {
  const { id } = req.params;
  const category = await Categories.findByPk(id);

  res.json(category);
};
const actualizarCategory = async (req, res = response) => {
  const { id } = req.params;
  const data = req.body;

  let category = await Categories.update(data, { where: { id } });
  category = await Categories.findByPk(id);

  res.json(category);
};
const borrarCategory = async (req, res = response) => {
  const { id } = req.params;
  const categoriaBorrada = await Categories.update(
    { status: false },
    {
      where: { id },
    }
  );

  res.json(categoriaBorrada);
};
module.exports = {
  getCategories,
  crearCategory,
  obtenerCategoria,
  actualizarCategory,
borrarCategory

};
