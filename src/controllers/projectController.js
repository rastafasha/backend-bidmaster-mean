const { response } = require('express');
const Project = require('../models/project');

 const getProjects = async (req, res) =>{
    try {
        const projects = await Project.find()
        .sort({ createdAt: -1 })
        // .populate('ProjectType');
        //traemos las tareas en orden de ultima fecha
        projects.sort((a,b) => b.createdAt - a.createdAt);
        
       
        res.json({
            ok: true,
            projects
        });
    } catch (error) {
        return res.status(500).json({message: 'Error al obtener proyectos'});
    }
};
 const getProjectsByUser = async (req, res) =>{
     const uid = req.uid;
    try {
        const projects = await Project.find({
            partners: req.params.id
        });
        res.json({
            ok: true,
            projects
        });
    } catch (error) {
        return res.status(404).json({ message: 'No projects found' });
    }
};
 const createProject = async (req, res) =>{
    // try {
    //     const {name, type, deliveryDate, hasPresentation, url} = req.body;
    //     const newProject = new Project({
    //         name, 
    //         type, 
    //         deliveryDate,
    //         hasPresentation,
    //         url: req.body.url || '',
    //         user: req.user.id
    //     });
    //     const saveProject =  await newProject.save();
    //     res.json(saveProject);
    // } catch (error) {
    //     return res.status(400).json({message: error.message});
    // }
    const uid = req.uid;
        const project = new Project({
            usuario: uid,
            ...req.body
        });
    
        try {
    
            const projectDB = await project.save();
    
            res.json({
                ok: true,
                project: projectDB
            });
    
        } catch (error) {
            // console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            });
        }
    

};
 const getProject = async (req, res) =>{
  try {
     const project = await Project.findById(req.params.id)
        
   if(!project) return res.status(404).json({msg: 'project not found'})
    res.json({
            ok: true,
            project
        });

  } catch (error) {
    return res.status(404).json({msg: 'project not found'})
  }
};
 const deleteProject = async (req, res) =>{
    try {
        const project = await Project.findByIdAndDelete(req.params.id)
        if(!project) return res.status(404).json({msg: 'project not found'})
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({msg: 'project not found'})
    }
};
 const updateProject = async (req, res) =>{
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!project) return res.status(404).json({msg: 'Project not found'})
        res.json({
            ok: true,
            project
        });
    } catch (error) {
        return res.status(404).json({msg: 'project not found'})
    }
};

function updateStatus(req, res) {
    var id = req.params['id'];
    // console.log(id);
    Project.findByIdAndUpdate({ _id: id }, { status: true }, (err, project_data) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (project_data) {
                res.status(200).send({ project: project_data });
            } else {
                res.status(403).send({ message: 'No se actualizó el project, vuelva a intentar nuevamente.' });
            }
        }
    })
}

module.exports = {
    getProjects,
getProjectsByUser,
createProject,
getProject,
deleteProject,
updateProject,
updateStatus,


};