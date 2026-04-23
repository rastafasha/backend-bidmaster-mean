const { response } = require('express');
const ProjectType = require('../models/projecttype');
const Usuario = require('../models/usuario');
const Project = require('../models/project');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const typeFilter = req.query.type || null;
    const regex = new RegExp(busqueda, 'i');

    // Build project query filter
    let projectFilter = { name: regex };
    if (typeFilter) {
        projectFilter.type = typeFilter;
    }

    const [usuarios, projecttypes, projects] = await Promise.all([
        Usuario.find({ username: regex }),
        ProjectType.find({ name: regex }),
        Project.find(projectFilter),
    ]);

    res.json({
        ok: true,
        usuarios,
        projecttypes,
        projects
    });
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ username: regex });
            break;
        case 'projecttypes':
            data = await ProjectType.find({ name: regex });
            break;
        case 'projects':
            data = await Project.find({ name: regex, type:regex });
            break;
        // case 'pagos':
        //     data = await Pago.find({ referencia: regex })
        //         .populate('referencia', 'monto img');
        //     break;
        // case 'subcriptions':
        //     data = await Subcriptionpaypal.find({ orderID: regex })
        //         .populate('orderID', 'orderID payerID plan_id status usuarios createdAt updatedAt');
        //     break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla debe ser usuarios/projecttypes/projects'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

    const [usuarios, projecttypes,  projects] = await Promise.all([
        Usuario.find({ username: regex }),
        ProjectType.find({ name: regex }),
        Project.find({ name: regex, type:regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        projects,
        projecttypes,

    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}