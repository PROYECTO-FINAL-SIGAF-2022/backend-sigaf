// Falta agregar cosas al post-put-delete

import { HistorialesParcelasCultivosModelo } from "../models/HistorialesParcelasCultivos.model.js";

// Devuelve todos los Historials de la colección
export const getHistoriales = async (req, res) => {
  try {
    const Datos = await HistorialesParcelasCultivosModelo.findAll({where: { activo: true }}); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getHistorialUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await HistorialesParcelasCultivosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postHistorial = async (req, res) => {
  try {
    const {
      id_parcela_cultivo,
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
    } = req.body;

    const nuevoHistorial = await HistorialesParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
    });

    res.json({
      msg: "El Historial se creo Correctamente",
      nuevoHistorial,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateHistorial = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_parcela_cultivo,
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
    } = req.body[0];

    // console.log(id_parcela_cultivo);

    const updateHist = await HistorialesParcelasCultivosModelo.findOne({
      where: { id_historial_parcelas_cultivos: id },
    });
    // console.log(updateHist.id_parcela_cultivo);
    updateHist.id_parcela_cultivo = id_parcela_cultivo;
    updateHist.id_actividad = id_actividad;
    updateHist.id_usuario = id_usuario;
    updateHist.cantidad_uso_producto = cantidad_uso_producto;
    updateHist.id_producto = id_producto;
    await updateHist.save();

    res.json({
      msg: "El Historial se actualizo Correctamente",
      updateHist,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteHistorial = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarHistorial = await HistorialesParcelasCultivosModelo.findOne({ where: { id_historial_parcelas_cultivos: id } });

    eliminarHistorial.activo = false;

    await eliminarHistorial.save();

    res.json({
      message: `El Historial con el id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
