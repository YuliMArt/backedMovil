const { Router } = require("express");
const { check } = require("express-validator");
const {
  getMantenimientos,
  addMantenimiento,
  actualizarMant,
} = require("../controllers/mantenimiento");
const { existeAutoPorId } = require("../helpers");
const { validarJWT, esAdminRole, validarCampos } = require("../middlewares");
const router = Router();
router.get("/:id", getMantenimientos);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("idauto", "El automovil  es obligatorio").not().isEmpty(),
    check("idauto").custom(existeAutoPorId),
    check("idCat", "El servicio es obligatorio").not().isEmpty(),
    check("idsubcat", "El subservicio es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  addMantenimiento
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("idAuto", "El automovil es obligatorio").not().isEmpty(),
    check("id_user", "La marca es obligatoria").not().isEmpty(),
    check("idCat", "El servicio es obligatorio").not().isEmpty(),
    check("idsubcat", "El subservicio es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarMant
);
module.exports = router;
