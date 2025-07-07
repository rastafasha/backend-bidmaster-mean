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
} = require('../controllers/project.controller.js');

const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/projects',  validarJWT, getProjects);
router.get('/projects/user/:id',  validarJWT, getProjectsByUser);
router.get('/project/:id',  validarJWT, getProject);
router.post('/projects/store',  
    validarJWT, 
     createProject 
    );
router.delete('/projects/delete/:id',  validarJWT, deleteProject);
router.put('/projects/update/:id',  validarJWT, updateProject);


module.exports = router;