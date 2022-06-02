const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCategories,
  crearCategory,
  obtenerCategoria,
  actualizarCategory,
  borrarCategory,
} = require("../controllers/category");
const { existeCategoryPorId, existeCategoryNombre } = require("../helpers");
const { validarCampos, esAdminRole, validarJWT } = require("../middlewares");
const router = Router();
/**
 *? {{url}}/api/setcategory
 */
router.get("/", getCategories);
router.get(
  "/:id",
  [check("id").custom(existeCategoryPorId), validarCampos],
  obtenerCategoria
);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    // check("nombre").custom(existeCategoryNombre),

    validarCampos,
  ],
  crearCategory
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id").custom(existeCategoryPorId),
    validarCampos,
  ],
  actualizarCategory
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    // check('id', 'No es un id de Mongo válido').isMongoId(),
    check("id").custom(existeCategoryPorId),
    validarCampos,
  ],
  borrarCategory
);
module.exports = router;
