import { ActividadesModelo } from "../models/Actividades.model.js";
import { logSistema } from "../helpers/createLog.js";

// Devuelve todos los actividadess de la colección
export const getActividades = async (req, res) => {
  try {
    const actividad = await ActividadesModelo.findAll({ where: { activo: true } }); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(actividad);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getActividadUnico = async (req, res) => {
  try {
    const { id } = req.params;

    const actividad = await ActividadesModelo.findByPk(id); // consulta para todos los documentos

    await logSistema(req.decoded, actividad.dataValues, "busqueda");

    // Respuesta del servidor
    res.json(actividad);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postActividad = async (req, res) => {
  try {
    const { descripcion_actividad, id_establecimiento } = req.body;

    const nuevaActividad = await ActividadesModelo.create({
      descripcion_actividad,
      id_establecimiento,
    });

    await logSistema(req.decoded, nuevaActividad.dataValues, "creacion");

    res.status(201).json({
      msg: "La actividad se creo Correctamente",
      nuevaActividad,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateActividad = async (req, res) => {
  // console.log(req.body);
  try {
    const { id } = req.params;

    // console.log(req.body);
    const { descripcion_actividad } = req.body;
    // console.log(id);
    const updateActiv = await ActividadesModelo.findOne({
      where: { id_actividad: id },
    });

    // console.log(descripcion_actividad);
    updateActiv.descripcion_actividad = descripcion_actividad;
    // updateActiv.id_establecimiento = id_establecimiento;
    await updateActiv.save();

    await logSistema(req.decoded, updateActiv.dataValues, "actualizacion");

    res.status(200).json({
      msg: "La actividad se actualizo Correctamente",
      updateActiv,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    const { id } = req.params;

    const delleteActiv = await ActividadesModelo.findOne({
      where: { id_actividad: id },
    });

    delleteActiv.activo = false;
    await delleteActiv.save();

    await logSistema(req.decoded, delleteActiv.dataValues, "eliminacion");

    res.status(200).json({
      message: `Se elimino la actividad con el ID: ${id}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
