const { response } = require('express');
const Categoria = require('../models/categoria');
const Usuario = require('../models/usuario');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [usuarios,categorias,] = await Promise.all([
        Usuario.find({ username: regex}),
        Categoria.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        categorias,

    })
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
        case 'categorias':
            data = await Categoria.find({ nombre: regex });
            break;
        case 'pagos':
            data = await Pago.find({ referencia: regex })
                .populate('referencia', 'monto img');
            break;
        // case 'subcriptions':
        //     data = await Subcriptionpaypal.find({ orderID: regex })
        //         .populate('orderID', 'orderID payerID plan_id status usuarios createdAt updatedAt');
        //     break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla debe ser usuarios/categorias/'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

    const [usuarios, blogs, categorias, pagos, subcriptions] = await Promise.all([
        Usuario.find({ username: regex }),
        Categoria.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        categorias,

    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}