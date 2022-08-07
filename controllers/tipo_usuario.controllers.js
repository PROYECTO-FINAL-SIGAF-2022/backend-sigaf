import { Tipo_usuario } from "../models/Tipos_usuarios.model.js";

// Devuelve todos los Tipo_usuarios de la colección
export const getTipo_usuarios = async (req, res) => {
    try {
        const Datos = await Tipo_usuario.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getTipo_UsuarioUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await Tipo_usuario.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postTipo_Usuario = async (req, res) => {
    try {
        const {descripcion_tipo_usuario} = req.body;

        const nuevoTipo_Usuario = await Tipo_usuario.create({descripcion_tipo_usuario})

        res.json({
            msg: 'El Tipo_Usuario se creo Correctamente',
            nuevoTipo_Usuario
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateTipo_Usuario = async (req, res) => {
   try {
    const {id} = req.params;
    const {descripcion_tipo_usuario} = req.body

    console.log(id)

    const updateTipoUser = await Tipo_usuario.findOne({where: {id_tipo_usuario : id}})
    updateTipoUser.descripcion_tipo_usuario = descripcion_tipo_usuario
    await updateTipoUser.save()

    res.json(updateTipoUser)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteTipo_Usuario = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await Tipo_usuario.destroy({
            where: {
                id_tipo_usuario : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}