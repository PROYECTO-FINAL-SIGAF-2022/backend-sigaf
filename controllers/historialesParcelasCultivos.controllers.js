import { logSistema } from "../helpers/createLog.js";
import { HistorialesParcelasCultivosModelo } from "../models/HistorialesParcelasCultivos.model.js";

export const getHistoriales = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const historial = await HistorialesParcelasCultivosModelo.findAll({ where: { id_establecimiento, activo: true } });

    if (historial.length === 0) {
      return res.status(400).json("No hay historiales asociadas a este establecimiento");
    }
    return res.status(200).json(historial[0].dataValues);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getHistorialUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const historial = await HistorialesParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, historial.dataValues, "busqueda");

    if (!historial) {
      return res.status(400).json("No hay una historial asociado a este ID");
    }
    return res.status(200).json(historial);
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
      id_establecimiento,
    } = req.body;

    const nuevoHistorial = await HistorialesParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_actividad,
      id_usuario,
      cantidad_uso_producto,
      id_producto,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevoHistorial.dataValues, "creacion");

    return res.json({
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
    } = req.body;

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

    await logSistema(req.decoded, updateHist.dataValues, "atualizacion");

    res.json({
      msg: "El Historial se actualizo Correctamente",
      updateHist,
    });
  } catch (error) {
    console.log(error);
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

    await logSistema(req.decoded, eliminarHistorial.dataValues, "eliminacion");

    res.json({
      message: `El Historial con el id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
