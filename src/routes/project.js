/*
 Ruta: /api/projects
 */

const { Router } = require('express');
const router = Router();
const {
    createProject,
    getProject,
    getProjects,
    updateProject,
    deleteProject,
    getProjectsByUser
} = require('../controllers/projectController.js');

const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/',  validarJWT, getProjects);
router.get('/user/:id',  validarJWT, getProjectsByUser);
router.get('/project/:id',  validarJWT, getProject);
router.post('/store',  
    validarJWT, 
     createProject 
    );
router.delete('/delete/:id',  validarJWT, deleteProject);
router.put('/update/:id',  validarJWT, updateProject);


module.exports = router;