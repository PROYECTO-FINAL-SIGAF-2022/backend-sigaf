//Falta agregar cosas al post-put-delete

import { historiales_parcelas_cultivosModelo } from "../models/historiales_parcelas_cultivos.model.js";

// Devuelve todos los Historials de la colección
export const getHistoriales = async (req, res) => {
    try {
        const Datos = await historiales_parcelas_cultivosModelo.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getHistorialUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await historiales_parcelas_cultivosModelo.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postHistorial = async (req, res) => {
    try {
        const {id_parcela_cultivo,id_actividad,id_usuario,cantidad_uso_producto,id_producto} = req.body;

        const nuevoHistorial = await historiales_parcelas_cultivosModelo.create({id_parcela_cultivo,id_actividad,id_usuario,cantidad_uso_producto,id_producto})

        res.json({
            msg: 'El Historial se creo Correctamente',
            nuevoHistorial
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateHistorial = async (req, res) => {
   try {
    const {id} = req.params;
    const {id_parcela_cultivo,id_actividad,id_usuario,cantidad_uso_producto,id_producto} = req.body

    console.log(id)

    const updateHist = await historiales_parcelas_cultivosModelo.findOne({where: {id_historial_parcelas_cultivos : id}})
    updateHist.id_parcela_cultivo = id_parcela_cultivo
    updateHist.id_actividad = id_actividad
    updateHist.id_usuario = id_usuario
    updateHist.cantidad_uso_producto = cantidad_uso_producto
    updateHist.id_producto = id_producto
    await updateHist.save()

    res.json(updateHist)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteHistorial = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await historiales_parcelas_cultivosModelo.destroy({
            where: {
                id_historial_parcelas_cultivos : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}