import { DetalleCampanias } from "../models/DetalleCampanias.model.js";

// Devuelve todos los Campanias de la colección
export const getDetalleCampanias = async (req, res) => {
  try {
    const detalleCampania = await DetalleCampanias.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(detalleCampania);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetalleCampaniaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const detalleCampania = await DetalleCampanias.findByPk(id); // consulta para todos los documentos


    
    await logSistema(req.decoded, detalleCampania.dataValues, "busqueda");


    // Respuesta del servidor
    res.json(detalleCampania);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postDetalleCampania = async (req, res) => {
  try {
    const {
      id_campania, id_unidad_medida, cantidad_cosechada,
    } = req.body;

    const nuevoDetalleCampania = await DetalleCampanias.create({
      id_campania,
      id_unidad_medida,
      cantidad_cosechada,

    });

    await logSistema(req.decoded, nuevoDetalleCampania.dataValues, "creacion");

    res.json({
      msg: "El detalle de Campania se creo Correctamente",
      nuevoDetalleCampania,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDetalleCampania = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_campania, id_unidad_medida, cantidad_cosechada,
    } = req.body;

    const updateDetalleCamp = await DetalleCampanias.findOne({
      where: { id_detalle_campania: id },
    });
    updateDetalleCamp.id_campania = id_campania;
    updateDetalleCamp.id_unidad_medida = id_unidad_medida;
    updateDetalleCamp.cantidad_cosechada = cantidad_cosechada;

    await updateDetalleCamp.save();

    await logSistema(req.decoded, updateDetalleCamp.dataValues, "actualizacion");

    res.json({
      msg: "El detalle de Campaña se actualizo  Correctamente",
      updateDetalleCamp,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteDetalleCampania = async (req, res) => {
  try {
    const { id } = req.params;

    const eleiminarDetalleCompania = await DetalleCampanias.findOne(
      { where: { id_campania: id } },

    );

    eleiminarDetalleCompania.activo = false;

    await eleiminarDetalleCompania.save();

    await logSistema(req.decoded, eleiminarDetalleCompania.dataValues, "eliminacion");

    res.status(200).json({
      message: `El detalle de campaña  con ID  ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
