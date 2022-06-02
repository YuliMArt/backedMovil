const { Router } = require("express");
const { check } = require("express-validator");
const {
  getsubSubCategories,
  obtenersubCategoria,
  crearsubCategory,
  actualizarsubCategory,
  borrarsubCategory,
} = require("../controllers/subCategory");
const { existeSubCategoryPorId } = require("../helpers");
const { validarCampos, validarJWT, esAdminRole } = require("../middlewares");
const router = Router();
router.get("/sub/:id", getsubSubCategories);
router.get(
  "/:id",
  [check("id").custom(existeSubCategoryPorId), validarCampos],
  obtenersubCategoria
);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearsubCategory
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id").custom(existeSubCategoryPorId),
    validarCampos,
  ],
  actualizarsubCategory
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id").custom(existeSubCategoryPorId),
    validarCampos,
  ],
  borrarsubCategory
);
module.exports = router;
