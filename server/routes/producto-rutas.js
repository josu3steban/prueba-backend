const { Router } = require("express");
const { check } = require("express-validator");


const { getProductos, getProductoPorId, createProducto, updateProducto, deleteProducto } = require("../controller");
const { validarCampos } = require("../middleware");
const { existeProducto } = require("../helpers");

const router = Router();


router.get('/', getProductos);


router.get('/:id', [
   check('id', 'El id no es válido').isMongoId(),
   check('id').custom( existeProducto ),
   validarCampos
], getProductoPorId);


router.post('/', [
   check('nombre', 'El nombre del producto es necesario').notEmpty(),
   validarCampos
], createProducto);


router.put('/:id', [
   check('id', 'El id no es válido').isMongoId(),
   check('id').custom( existeProducto ),
   validarCampos
], updateProducto);


router.delete('/:id', [
   check('id', 'El id no es válido').isMongoId(),
   check('id').custom( existeProducto ),
   validarCampos
], deleteProducto);


module.exports = router;