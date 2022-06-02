const { response } = require("express");
const { Mantenimiento } = require("../models");
const { v4: uuidv4 } = require("uuid");
const db = require("../database/conexion");
const { QueryTypes } = require("sequelize");

const getMantenimientos = async (req, res = response) => {
  const { id } = req.params;
  
  const mantenimientos = await db.query(
    `SELECT mnttos.id,mnttos.idauto,mnttos.idCat ,mnttos.idsubcat , mnttos.nota,mnttos.dia, categories.nombre as ncat, subcategoria.nombre as nsubcat FROM mnttos INNER JOIN categories ON mnttos.idCat = categories.id INNER JOIN subcategoria ON mnttos.idsubcat = subcategoria.id where mnttos.idauto = '${id}' ORDER BY mnttos.dia DESC LIMIT 8`,
    {
      type: QueryTypes.SELECT,
    }
  );
  const total = await Mantenimiento.count(
    {
      where: { idauto: id },
    },
    { type: QueryTypes.SELECT }
  );
  // console.log(mantenimientos);

  res.json({
    total,
    mantenimientos,
  });
};
const addMantenimiento = async (req, res = response) => {
  const { ...body } = req.body;
  const data = { id: uuidv4(), ...body };
  console.log(data);
  const Mant = new Mantenimiento(data);
  const nuevoMant = await Mant.save();
  res.status(201).json(nuevoMant);
};
const actualizarMant = async (req, res = response) => {
  const { id } = req.params;
  const data = req.body;

  let mant = await Mantenimiento.update(data, { where: { id } });
  mant = await Mantenimiento.findByPk(id);

  res.json(mant);
};
module.exports = {
  getMantenimientos,
  addMantenimiento,
  actualizarMant,
};
