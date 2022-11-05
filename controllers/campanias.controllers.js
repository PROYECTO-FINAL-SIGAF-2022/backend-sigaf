import { CampaniasModelo } from "../models/Campanias.model.js";
import { logSistema } from "../helpers/createLog.js";

export const getCampanias = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const campania = await CampaniasModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });
    if (campania.length === 0) {
      return res.status(400).json("No hay campañas asociadas a este establecimiento");
    }
    return res.status(200).json(campania);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCampaniaUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const campania = await CampaniasModelo.findByPk(id);

    await logSistema(req.decoded, campania.dataValues, "busqueda");

    if (!campania) {
      return res.status(400).json("No hay una campania asociada a este ID");
    }
    return res.status(200).json(campania);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postCampania = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const {
      descripcion_campania, fecha_inicio, fecha_final,
    } = req.body;

    const nuevaCampania = await CampaniasModelo.create({
      descripcion_campania,
      fecha_inicio,
      fecha_final,
      // id_cultivo,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevaCampania.dataValues, "creacion");

    return res.json({
      msg: "La Campaña se creo Correctamente",
      nuevaCampania,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCampania = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      descripcion_campania, fecha_inicio, fecha_final,
    } = req.body;
    const updateCamp = await CampaniasModelo.findOne({
      where: { id_campania: id },
    });
    updateCamp.descripcion_campania = descripcion_campania;
    updateCamp.fecha_inicio = fecha_inicio;
    updateCamp.fecha_final = fecha_final;
    // updateCamp.id_cultivo = id_cultivo;
    await updateCamp.save();

    await logSistema(req.decoded, updateCamp.dataValues, "actualizacion");

    return res.json({
      msg: "La campaña se actualizo  Correctamente",
      updateCamp,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCampania = async (req, res) => {
  try {
    const { id } = req.params;

    const eleiminarCompania = await CampaniasModelo.findOne(
      { where: { id_campania: id } },

    );

    eleiminarCompania.activo = false;

    await eleiminarCompania.save();

    await logSistema(req.decoded, eleiminarCompania.dataValues, "eliminacion");
    return res.status(200).json({
      message: "La campaña se elimino correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
