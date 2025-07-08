
const { response } = require('express');
const ProjectType = require('../models/projecttype');

 const getProjectTypes = async (req, res) =>{
    try {
        const projecttypes = await ProjectType.find()
        
        //traemos las tareas en orden de ultima fecha
        projecttypes.sort((a,b) => b.createdAt - a.createdAt);

        res.json({
        ok: true,
        projecttypes
    });
    } catch (error) {
        return res.status(500).json({message: 'Error al obtener tipos de proyectos'});
    }
};

 const createProjectType = async (req, res) =>{
    try {
        const {name} = req.body;
        const newProjectType = new ProjectType({
            name, 
        });
        const saveProjectType =  await newProjectType.save();
        res.json(saveProjectType);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }

};
 const getProjectType = async (req, res) =>{
  try {
     const projecttype = await ProjectType.findById(req.params.id)
   if(!projecttype) return res.status(404).json({msg: 'projecttype not found'})
    // res.json(projecttype);
 res.json({
        ok: true,
        projecttype
    });

  } catch (error) {
    return res.status(404).json({msg: 'projecttype not found'})
  }
};
 const deleteProjectType = async (req, res) =>{
    try {
        const projecttype = await ProjectType.findByIdAndDelete(req.params.id)
        if(!projecttype) return res.status(404).json({msg: 'projecttype not found'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({msg: 'projecttype not found'})
    }
};
 const updateProjectType = async (req, res) =>{
    try {
        const projecttype = await ProjectType.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!projecttype) return res.status(404).json({msg: 'projecttype not found'})
        // res.json(projecttype);
    res.json({
        ok: true,
        projecttype
    });
    } catch (error) {
        return res.status(404).json({msg: 'projecttype not found'})
    }
};

module.exports = {
     getProjectTypes ,
createProjectType,
getProjectType,
deleteProjectType,
updateProjectType,


};