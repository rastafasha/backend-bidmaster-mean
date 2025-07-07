const Profile = require('../models/profile');



const actualizarImagenCloudinary = async(tipo, id, nombreArchivo) => {
    try {
        const mapTipo = {
            'profiles': await Profile.findById(id),
        }
        const resultadoColeccion = mapTipo[tipo];
        if (resultadoColeccion.length == 0) {
            return false;
        }
        
        // No local file deletion logic needed
        resultadoColeccion.img = `${nombreArchivo}`; // Update the image name with concatenation
        // No need to store the file extension
        await resultadoColeccion.save();
        return true;


    } catch (error) {
        return false;
    }
}


module.exports = {
    actualizarImagenCloudinary
};

