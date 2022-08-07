import { parcela_cultivosModelo } from "../models/parcelas_cultivos.model.js";

// Devuelve todos los Cultivos de la colección
export const getParcela_Cultivos = async (req, res) => {
    try {
        const Datos = await parcela_cultivosModelo.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getParcela_CultivoUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await parcela_cultivosModelo.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postParcela_Cultivo = async (req, res) => {
    try {
        const {id_parcela, id_cultivo, id_campania, cantidad_sembrada} = req.body;

        const nuevoParcela_Cultivo = await parcela_cultivosModelo.create({id_parcela, id_cultivo, id_campania, cantidad_sembrada})

        res.json({
            msg: 'El Parcela_Cultivo se creo Correctamente',
            nuevoParcela_Cultivo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateParcela_Cultivo = async (req, res) => {
   try {
    const {id} = req.params;
    const {id_parcela, id_cultivo, id_campania, cantidad_sembrada} = req.body

    console.log(id)

    const updateParc_Cult = await parcela_cultivosModelo.findOne({where: {id_parcelas_cultivos : id}})
    updateParc_Cult.id_parcela = id_parcela
    updateParc_Cult.id_cultivo = id_cultivo
    updateParc_Cult.id_campania = id_campania
    updateParc_Cult.cantidad_sembrada = cantidad_sembrada
    await updateParc_Cult.save()

    res.json(updateParc_Cult)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteParcela_Cultivo = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await parcela_cultivosModelo.destroy({
            where: {
                id_parcelas_cultivos : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}