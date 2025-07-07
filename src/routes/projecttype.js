/*
 Ruta: /api/categorias
 */

const { Router } = require('express');
const router = Router();
const {
    createProjectType,
    getProjectType,
    getProjectTypes,
    updateProjectType,
    deleteProjectType,
} = require('../controllers/projectType.controller.js');

const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/typeprojects',  validarJWT, getProjectTypes);
router.get('/typeproject/:id',  validarJWT, getProjectType);
router.post('/typeprojects/store',  
    validarJWT, 
     createProjectType 
    );
router.delete('/typeprojects/delete/:id',  validarJWT, deleteProjectType);
router.put('/typeprojects/update/:id',  validarJWT, updateProjectType);


module.exports = router;