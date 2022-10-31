import { logSistema } from "../helpers/createLog.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";

export const getParcelasCultivos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const datosParcCultivo = await ParcelasCultivosModelo.findAll({ where: { id_establecimiento, activo: true } });

    if (datosParcCultivo.length === 0) {
      return res.status(400).json("No hay parcelas cultivos asociados a este establecimiento");
    }
    return res.status(200).json(datosParcCultivo[0].dataValues);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getParcelaCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const datosParcCultivo = await ParcelasCultivosModelo.findByPk(id);

    await logSistema(req.decoded, datosParcCultivo.dataValues, "busqueda");

    if (!datosParcCultivo) {
      return res.status(400).json("No hay una datos parcela cultivo asociada a este ID");
    }
    return res.status(200).json(datosParcCultivo);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postParcelaCultivo = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      id_parcela, id_cultivo, id_campania, cantidad_sembrada,
    } = req.body;

    const nuevoParcelaCultivo = await ParcelasCultivosModelo.create({
      id_parcela,
      id_cultivo,
      id_campania,
      cantidad_sembrada,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevoParcelaCultivo.dataValues, "creacion");

    return res.json({
      msg: "La Parcela_Cultivo se creo Correctamente",
      nuevoParcelaCultivo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_parcela, id_cultivo, id_campania, cantidad_sembrada,
    } = req.body;

    const updateParcCult = await ParcelasCultivosModelo.findOne({
      where: { id_parcela_cultivo: id },
    });
    updateParcCult.id_parcela = id_parcela;
    updateParcCult.id_cultivo = id_cultivo;
    updateParcCult.id_campania = id_campania;
    updateParcCult.cantidad_sembrada = cantidad_sembrada;
    await updateParcCult.save();

    await logSistema(req.decoded, updateParcCult.dataValues, "actualizacion");

    res.json({
      msg: "La Parcela_Cultivo se actualizo Correctamente",
      updateParcCult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteParcelaCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarParcelaCultivo = await ParcelasCultivosModelo.findOne(
      { where: { id_parcela_cultivo: id } },
    );

    eliminarParcelaCultivo.activo = false;

    await eliminarParcelaCultivo.save();

    await logSistema(req.decoded, eliminarParcelaCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `La Parcela_Cultivo con id ${id} fue eliminado`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
