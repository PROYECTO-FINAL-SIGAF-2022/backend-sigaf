import {Establecimiento} from '../models/Establecimiento.model.js';

// Devuelve todos los Establecimientos de la colección
export const getEstablecimientos = async (req, res) => {
    try {
        const Datos = await Establecimiento.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getEstablecimientoUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await Establecimiento.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postEstablecimiento = async (req, res) => {
    try {
        const {
            descripcion_establecimiento,
            georeferencia,
            superficie,
            id_usuario,
        } = req.body;

        const nuevoEstablecimiento = await Establecimiento.create({
            descripcion_establecimiento,
            georeferencia,
            superficie,
            id_usuario,
        })

        res.json({
            msg: 'El Establecimiento se creo Correctamente',
            nuevoEstablecimiento
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateEstablecimiento = async (req, res) => {
   try {
    const {id} = req.params;
    const {descripcion_establecimiento,georeferencia,superficie} = req.body
    console.log(id)
    const UpdateEstab = await Establecimiento.findOne({where: {id_establecimiento : id}})
    UpdateEstab.descripcion_establecimiento = descripcion_establecimiento
    UpdateEstab.georeferencia = georeferencia
    UpdateEstab.superficie = superficie
    await UpdateEstab.save()

    res.json(UpdateEstab)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteEstablecimiento = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await Establecimiento.destroy({
            where: {
                id_establecimiento : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
