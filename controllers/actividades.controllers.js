import { actividadesModelo } from "../models/actividades.model.js";

// Devuelve todos los actividadess de la colección
export const getActividades = async (req, res) => {
    try {
        const Datos = await actividadesModelo.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getActividadUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await actividadesModelo.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postActividad = async (req, res) => {
    try {
        const {descripcion_actividad} = req.body;

        const nuevaActividad = await actividadesModelo.create({descripcion_actividad})

        res.json({
            msg: 'El actividades se creo Correctamente',
            nuevaActividad
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateActividad = async (req, res) => {
   try {
    const {id} = req.params;
    const {descripcion_actividad} = req.body
    console.log(id)
    const updateActiv = await actividadesModelo.findOne({where: {id_actividad : id}})
    updateActiv.descripcion_actividad = descripcion_actividad
    await updateActiv.save()

    res.json(updateActiv)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteActividad = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await actividadesModelo.destroy({
            where: {
                id_actividad : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}