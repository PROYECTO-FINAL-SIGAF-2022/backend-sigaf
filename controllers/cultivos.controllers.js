import { logSistema } from "../helpers/createLog.js";
import { CultivosModelo } from "../models/Cultivos.model.js";

export const getCultivos = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const cultivos = await CultivosModelo.findAll({ where: { id_establecimiento, activo: true } });
    if (cultivos.length === 0) {
      return res.status(400).json("No hay cultivos asociadas a este establecimiento");
    }
    return res.status(200).json(cultivos[0].dataValues);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCultivoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const cultivos = await CultivosModelo.findByPk(id);

    await logSistema(req.decoded, cultivos.dataValues, "busqueda");

    if (!cultivos) {
      return res.status(400).json("No hay una cultivos asociada a este ID");
    }
    return res.status(200).json(cultivos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({

      message: error.message,
    });
  }
};

export const postCultivo = async (req, res) => {
  try {
    const { descripcion_cultivo, id_establecimiento } = req.body;

    const nuevoCultivo = await CultivosModelo.create({ descripcion_cultivo, id_establecimiento });

    await logSistema(req.decoded, nuevoCultivo.dataValues, "creacion");

    res.status(201).json({
      msg: "El Cultivo se creo Correctamente",
      nuevoCultivo,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCultivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_cultivo } = req.body;

    const updateCult = await CultivosModelo.findOne({
      where: { id_cultivo: id },
    });
    updateCult.descripcion_cultivo = descripcion_cultivo;
    await updateCult.save();

    await logSistema(req.decoded, updateCult.dataValues, "actualizacion");

    res.json(updateCult);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCultivo = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarCultivo = await CultivosModelo.findOne({ where: { id_cultivo: id } });

    eliminarCultivo.activo = false;

    await eliminarCultivo.save();

    await logSistema(req.decoded, eliminarCultivo.dataValues, "eliminacion");

    res.status(200).json({
      message: `El Cultivo con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
