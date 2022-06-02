const { response } = require("express");
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/conexion");
const { SubCategories } = require("../models");

const getsubSubCategories = async (req, res = response) => {
  const { id } = req.params;

  const { count: total, rows: subcategorias } =
    await SubCategories.findAndCountAll({ where: { estado: true ,id_cat: id} });

  res.json({
    total,
    subcategorias,
  });
};
const crearsubCategory = async (req, res = response) => {
  const { ...body } = req.body;
  const data = {
    ...body,
    id: uuidv4(),
  };
  const category = new SubCategories(data);
  const nuevocategory = await category.save();
  res.status(201).json(nuevocategory);
};
const obtenersubCategoria = async (req, res = response) => {
  const { id } = req.params;
  const subcategory = await SubCategories.findByPk(id);

  res.json(subcategory);
};
const actualizarsubCategory = async (req, res = response) => {
  const { id } = req.params;
  const data = req.body;

  let subcategory = await SubCategories.update(data, { where: { id } });
  subcategory = await SubCategories.findByPk(id);

  res.json(subcategory);
};
const borrarsubCategory = async (req, res = response) => {
  const { id } = req.params;
  console.log(id,'borrado');
  const categoriaBorrada = await SubCategories.update(
    { estado: false },
    {
      where: { id },
    }
  );
  console.log(categoriaBorrada);

  // res.json(categoriaBorrada);
  res.json({ok:true});
};
module.exports = {
  getsubSubCategories,
  crearsubCategory,
  obtenersubCategoria,
  actualizarsubCategory,
  borrarsubCategory,
};
