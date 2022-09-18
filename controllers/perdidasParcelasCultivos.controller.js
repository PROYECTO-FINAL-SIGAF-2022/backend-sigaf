import { logSistema } from "../helpers/createLog.js";
import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";

// TODO: falta agregar el activo en el modelo y controlador
export const getPerdidasParcelasCultivos = async (req, res) => {
  try {
    const perdidaParCult = await PerdidasParcelasCultivosModelo.findAll();
    res.status(200).json(perdidaParCult);
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

    res.status(200).json(perdidaParCult);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postPerdidaParcelaCultivo = async (req, res) => {
  try {
    const { id_parcela_cultivo, cantidad_perdida, id_unidad_medida } = req.body;

    const nuevaPerdidaParcelaCultivo = await PerdidasParcelasCultivosModelo.create({
      id_parcela_cultivo,
      id_unidad_medida,
      cantidad_perdida,
    });

    await logSistema(req.decoded, nuevaPerdidaParcelaCultivo.dataValues, "creacion");

    res.status(201).json({
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
