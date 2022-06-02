const Role = require("../models/role");
const { Usuario, Categoria, Servicio, Categories, SubCategories } = require("../models");
const Automovil = require("../models/automovil");
const SubCategory = require("../models/subCategory");

const esRoleValido = async (rol = "USER_ROLE") => {
  const existeRol = await Role.findOne({ where: { rol } });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  // Verificar si el correo existe{ where: { title: 'My Title' } }
  const existeEmail = await Usuario.findOne({ where: { correo } });

  if (existeEmail != null) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe

  const existeUsuario = await Usuario.findByPk(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};
// !AUTOS
const existeAutoPorId = async (id) => {
  // Verificar si el correo existe
  const existeAuto = await Automovil.findByPk(id);
  if (!existeAuto) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Categorias
 */
const existeCategoriaPorId = async (id) => {
  // Verificar si el correo existe
  const existeCategoria = await Categoria.findByPk(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};
// !categorias principal
const existeCategoryPorId = async (id) => {
  // Verificar si el correo existe
  const existeCategoria = await Categories.findByPk(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};
const existeCategoryNombre = async (nombre) => {
  // Verificar si el correo existe
  const existeCategoria = await Categories.findOne({ where: { nombre } });
  console.log(existeCategoria);
  if (existeCategoria!=null) {
    throw new Error(`La categoria ${nombre} ya existe `);
  }
};
const existeCategoriaNombre = async (nombre) => {
  // Verificar si el correo existe
  const existeCategoria = await Categoria.findOne({ where: { nombre } });
  console.log(existeCategoria);
  if (existeCategoria!=null) {
    throw new Error(`La categoria ${nombre} ya existe `);
  }
};
const existeSubCategoryPorId = async (id) => {
  // Verificar si el correo existe
  const existeCategoria = await SubCategory.findByPk(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Productos
 */
const existeServicioPorId = async (id) => {
  // Verificar si el correo existe
  const existeServicio = await Servicio.findByPk(id);
  if (!existeServicio) {
    throw new Error(`El id no existe ${id}`);
  }
};

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La colección ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeServicioPorId,
  coleccionesPermitidas,
  existeCategoriaNombre,
  existeAutoPorId,
  existeCategoryPorId,
  existeCategoryNombre,
  existeSubCategoryPorId
};
