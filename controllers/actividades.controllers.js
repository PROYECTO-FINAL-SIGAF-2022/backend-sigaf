import { ActividadesModelo } from "../models/Actividades.model.js";
import { LogSistema } from "../models/LogSistema.js";

// Devuelve todos los actividadess de la colección
export const getActividades = async (req, res) => {
  try {
    const actividad = await ActividadesModelo.findAll(); // consulta para todos los documentos

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

    const { id_usuario } = req.decoded.paramUsuario;

    const actividad = await ActividadesModelo.findByPk(id); // consulta para todos los documentos

    const dataLog = actividad.dataValues;

    await LogSistema.create({
      id_usuario,
      descripcion_log: `El usuario con ID ${id_usuario} realizo la siguiente busqueda, ${JSON.stringify(dataLog)}`,
    });

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
    const { descripcion_actividad } = req.body;

    const { id_usuario } = req.decoded.paramUsuario;

    const nuevaActividad = await ActividadesModelo.create({
      descripcion_actividad,
    });

    const dataLog = nuevaActividad.dataValues;

    await LogSistema.create({
      id_usuario,
      descripcion_log: `El usuario con ID ${id_usuario} realizo la siguiente creacion, ${dataLog}`,
    });

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
    const { id_usuario } = req.decoded.paramUsuario;
    // console.log(req.body);
    const { descripcion_actividad } = req.body;
    // console.log(id);
    const updateActiv = await ActividadesModelo.findOne({
      where: { id_actividad: id },
    });

    // console.log(descripcion_actividad);
    updateActiv.descripcion_actividad = descripcion_actividad;
    await updateActiv.save();

    const dataLog = updateActiv.dataValues;

    await LogSistema.create({
      id_usuario,
      descripcion_log: `El usuario con ID ${id_usuario} realizo la siguiente actualizacion, ${dataLog}`,
    });

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
    const { id_usuario } = req.decoded.paramUsuario;

    const delleteActiv = await ActividadesModelo.findOne({
      where: { id_actividad: id },
    });

    delleteActiv.activo = false;
    await delleteActiv.save();

    const dataLog = delleteActiv.dataValues;

    await LogSistema.create({
      id_usuario,
      descripcion_log: `El usuario con ID ${id_usuario} realizo la siguiente eliminacion, ${dataLog}`,
    });

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
