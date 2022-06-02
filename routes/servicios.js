const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearServicio,
        obtenerServicios,
        obtenerServicio,
        actualizarServicio, 
        borrarServicio } = require('../controllers/servicios');

const { existeCategoriaPorId, existeServicioPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
router.get('/', obtenerServicios );

// Obtener una categoria por id - publico
router.get('/:id',[
    // check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeServicioPorId ),
    validarCampos,
], obtenerServicio );

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearServicio );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom( existeServicioPorId ),
    validarCampos
], actualizarServicio );

// Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    // check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeServicioPorId ),
    validarCampos,
], borrarServicio);


module.exports = router;