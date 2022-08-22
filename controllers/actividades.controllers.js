import { ActividadesModelo } from '../models/Actividades.model.js';

// Devuelve todos los actividadess de la colección
export const getActividades = async (req, res) => {
  try {
    const Datos = await ActividadesModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getActividadUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await ActividadesModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postActividad = async (req, res) => {
  try {
    const { descripcion_actividad } = req.body;

    const nuevaActividad = await ActividadesModelo.create({
      descripcion_actividad,
    });

    res.json({
      msg: 'El actividades se creo Correctamente',
      nuevaActividad,
    });
  } catch (error) {
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
    const { descripcion_actividad } = req.body[0];
    // console.log(id);
    const updateActiv = await ActividadesModelo.findOne({
      where: { id_actividad: id },
    });

    // console.log(descripcion_actividad);
    updateActiv.descripcion_actividad = descripcion_actividad;
    await updateActiv.save();

    res.json(updateActiv);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    const { id } = req.params;

    await ActividadesModelo.destroy(
      {
        where: {
          id_actividad: id,
        },
      },
      console.log(id)
    );

    res.status(200).json({
      message: `Se elimino la actividad con el ID: ${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
