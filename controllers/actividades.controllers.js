import { ActividadesModelo } from "../models/Actividades.model.js";
import { logSistema } from "../helpers/createLog.js";

// Devuelve todos los actividadess de la colección
export const getActividades = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;
    const actividades = await ActividadesModelo.findAll({ raw: true, where: { id_establecimiento, activo: true } });

    if (actividades.length === 0) {
      return res.status(400).json("No hay actividades asociadas a este establecimiento");
    }
    return res.status(200).json(actividades);

    // Respuesta del servidor
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

    const actividad = await ActividadesModelo.findByPk(id);

    await logSistema(req.decoded, actividad.dataValues, "busqueda");

    if (!actividad) {
      return res.status(400).json("No hay una actividad asociada a este ID");
    }
    return res.status(200).json(actividad);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postActividad = async (req, res) => {
  try {
    const { id_establecimiento } = req.decoded.paramUsuario;

    const { descripcion_actividad } = req.body;

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
