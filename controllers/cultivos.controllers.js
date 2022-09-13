import { logSistema } from "../helpers/createLog.js";
import { CultivosModelo } from "../models/Cultivos.model.js";

// Devuelve todos los Cultivos de la colección
export const getCultivos = async (req, res) => {
  try {
    const cultivos = await CultivosModelo.findAll({ where: { activo: true } });
    res.status(200).json(cultivos);
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

    res.status(200).json(cultivos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({

      message: error.message,
    });
  }
};

export const postCultivo = async (req, res) => {
  try {
    const { descripcion_cultivo } = req.body;

    const nuevoCultivo = await CultivosModelo.create({ descripcion_cultivo });

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
