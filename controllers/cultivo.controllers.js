import { cultivoModelo } from "../models/cultivo.model.js";

// Devuelve todos los Cultivos de la colección
export const getCultivos = async (req, res) => {
    try {
        const Datos = await cultivoModelo.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getCultivoUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await cultivoModelo.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postCultivo = async (req, res) => {
    try {
        const {cultivo} = req.body;

        const nuevoCultivo = await cultivoModelo.create({cultivo})

        res.json({
            msg: 'El Cultivo se creo Correctamente',
            nuevoCultivo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateCultivo = async (req, res) => {
   try {
    const {id} = req.params;
    const {cultivo} = req.body

    console.log(id)

    const updateCult = await cultivoModelo.findOne({where: {id_cultivo : id}})
    updateCult.cultivo = cultivo
    await updateCult.save()

    res.json(updateCult)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteCultivo = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await cultivoModelo.destroy({
            where: {
                id_cultivo : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}