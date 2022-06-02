const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAutomoviles,
  obtenerAuto,
  crearAuto,
  actualizarAutomovil,
  borrarAuto,
} = require("../controllers/automovil");
const { existeAutoPorId } = require("../helpers");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

/**
 * {{url}}/api/automoviles
 */

//  Obtener todas las vutomovil - publico
router.get("/", getAutomoviles);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [check("id").custom(existeAutoPorId), validarCampos],
  obtenerAuto
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,

    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("marca", "La marca es obligatoria").not().isEmpty(),
    check("modelo", "El modelo es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearAuto
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [validarJWT, esAdminRole, check("id").custom(existeAutoPorId), validarCampos],
  actualizarAutomovil
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    // // check('id', 'No es un id de Mongo válido').isMongoId(),
    check("id").custom(existeAutoPorId),
    validarCampos,
  ],
  borrarAuto
);

module.exports = router;
