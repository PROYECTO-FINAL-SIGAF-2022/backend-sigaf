import { DetalleCampanias } from "../models/DetalleCampanias.model";

// Devuelve todos los Campanias de la colección
export const getDetalleCampanias = async (req, res) => {
  try {
    const Datos = await DetalleCampanias.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetalleCampaniaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await DetalleCampanias.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postDetalleCampania = async (req, res) => {
  try {
    const {
      descripcion_campania, fecha_inicio, fecha_final, id_cultivo,
    } = req.body;

    const nuevoDetalleCampania = await DetalleCampanias.create({
      descripcion_campania,
      fecha_inicio,
      fecha_final,
      id_cultivo,
    });

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
      descripcion_campania, fecha_inicio, fecha_final, id_cultivo,
    } = req.body;
    console.log(id);
    const updateDetalleCamp = await DetalleCampanias.findOne({
      where: { id_campania: id },
    });
    updateDetalleCamp.descripcion_campania = descripcion_campania;
    updateDetalleCamp.fecha_inicio = fecha_inicio;
    updateDetalleCamp.fecha_final = fecha_final;
    updateDetalleCamp.id_cultivo = id_cultivo;
    await updateDetalleCamp.save();
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

    res.status(200).json({
      message: `El detalle de campaña  con ID  ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
