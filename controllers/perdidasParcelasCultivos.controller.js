import { logSistema } from "../helpers/createLog.js";
import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";

export const getPerdidasParcelasCultivos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const perdidaParCult = await PerdidasParcelasCultivosModelo.findAll({ where: { id_establecimiento } });
    if (perdidaParCult.length === 0) {
      return res.status(400).json("No hay registros de peridades asociadas a este establecimiento");
    }
    return res.status(200).json(perdidaParCult[0].dataValues);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPerdidaParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const perdidaParCult = await PerdidasParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, perdidaParCult.dataValues, "busqueda");

    if (!perdidaParCult) {
      return res.status(400).json("No hay una perdidas asociada a este ID");
    }
    return res.status(200).json(perdidaParCult);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postPerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const { id_parcela_cultivo, cantidad_perdida, id_unidad_medida } = req.body;

    const nuevaPerdidaParcelaCultivo = await PerdidasParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_unidad_medida,
      cantidad_perdida,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevaPerdidaParcelaCultivo.dataValues, "creacion");

    return res.status(201).json({
      msg: "La perdida parcela-cultivo se creo correctamente",
      nuevaPerdidaParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_parcela_cultivo,
      id_unidad_medida,
      cantidad_perdida,
    } = req.body;

    const updatePerdidaParcCult = await PerdidasParcelasCultivosModelo.findOne({
      where: { id_perdida_parcela_cultivo: id },
    });
    updatePerdidaParcCult.id_parcela_cultivo = id_parcela_cultivo;
    updatePerdidaParcCult.id_unidad_medida = id_unidad_medida;
    updatePerdidaParcCult.cantidad_perdida = cantidad_perdida;
    await updatePerdidaParcCult.save();

    await logSistema(req.decoded, updatePerdidaParcCult.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La perdida se actualizo Correctamente",
      updatePerdidaParcCult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarPerdida = await PerdidasParcelasCultivosModelo.findOne({
      where: { id_perdida_parcela_cultivo: id },
    });

    eliminarPerdida.activo = false;

    await eliminarPerdida.save();

    await logSistema(req.decoded, eliminarPerdida.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Perdida Parcela-Cultivo con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
