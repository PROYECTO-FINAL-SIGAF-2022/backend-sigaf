import { parcelaModelo } from "../models/parcela.model.js";

// Devuelve todos los Parcelas de la colección
export const getParcelas = async (req, res) => {
    try {
        const Datos = await parcelaModelo.findAll() // consulta para todos los documentos
        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const getParcelaUnico = async (req, res) => {
    try {
        const {id} = req.params;
        const Datos = await parcelaModelo.findByPk(id) // consulta para todos los documentos

        // Respuesta del servidor
        res.json(Datos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const postParcela = async (req, res) => {
    try {
        const {georeferencia,superficie,id_establecimiento} = req.body;

        const nuevaParcela = await parcelaModelo.create({georeferencia,superficie,id_establecimiento})

        res.json({
            msg: 'La Parcela se creo Correctamente',
            nuevaParcela
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateParcela = async (req, res) => {
   try {
    const {id} = req.params;
    const {georeferencia,superficie} = req.body

    console.log(id)

    const updateParc = await parcelaModelo.findOne({where: {id_parcela : id}})
    updateParc.georeferencia = georeferencia
    updateParc.superficie = superficie
    await updateParc.save()

    res.json(updateParc)

   } catch (error) {
    return res.status(500).json({
        message: error.message
    });
   }

}

export const deleteParcela = async (req, res) => {
    try {
        
        const {id} = req.params;
        
        await parcelaModelo.destroy({
            where: {
                id_parcela : id
                
            },
            
        },console.log(id));

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}