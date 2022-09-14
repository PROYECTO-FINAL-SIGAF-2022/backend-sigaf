import { CampaniasModelo } from "../models/Campanias.model.js";
import { logSistema } from "../helpers/createLog.js";

// Devuelve todos los Campanias de la colección
export const getCampanias = async (req, res) => {
  try {
    const campania = await CampaniasModelo.findAll({ where: { activo: true } }); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(campania);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCampaniaUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const campania = await CampaniasModelo.findByPk(id); // consulta para todos los documentos

    await logSistema(req.decoded, campania.dataValues, "busqueda");

    res.status(200).json(campania);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postCampania = async (req, res) => {
  try {
    const {
      descripcion_campania, fecha_inicio, fecha_final, id_cultivo,
    } = req.body;

    const nuevaCampania = await CampaniasModelo.create({
      descripcion_campania,
      fecha_inicio,
      fecha_final,
      id_cultivo,
    });

    await logSistema(req.decoded, nuevaCampania.dataValues, "creacion");

    res.json({
      msg: "La Campania se creo Correctamente",
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
      descripcion_campania, fecha_inicio, fecha_final, id_cultivo,
    } = req.body;
    const updateCamp = await CampaniasModelo.findOne({
      where: { id_campania: id },
    });
    updateCamp.descripcion_campania = descripcion_campania;
    updateCamp.fecha_inicio = fecha_inicio;
    updateCamp.fecha_final = fecha_final;
    updateCamp.id_cultivo = id_cultivo;
    await updateCamp.save();

    await logSistema(req.decoded, updateCamp.dataValues, "actualizacion");

    res.json({
      msg: "La Compania se actualizo  Correctamente",
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
    res.status(200).json({
      message: `La Compania con ID  ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
