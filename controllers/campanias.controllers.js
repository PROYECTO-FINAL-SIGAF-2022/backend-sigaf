import { CampaniasModelo } from '../models/Campanias.model.js';

// Devuelve todos los Campanias de la colección
export const getCampanias = async (req, res) => {
  try {
    const Datos = await CampaniasModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCampaniaUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await CampaniasModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postCampania = async (req, res) => {
  try {
    const { descripcion_campania, fecha_inicio, fecha_final, id_cultivo } =
      req.body;

    const nuevaCampania = await CampaniasModelo.create({
      descripcion_campania,
      fecha_inicio,
      fecha_final,
      id_cultivo,
    });

    res.json({
      msg: 'El Campania se creo Correctamente',
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
    const { descripcion_campania, fecha_inicio, fecha_final, id_cultivo } =
      req.body[0];
    console.log(id);
    const updateCamp = await CampaniasModelo.findOne({
      where: { id_campania: id },
    });
    updateCamp.descripcion_campania = descripcion_campania;
    updateCamp.fecha_inicio = fecha_inicio;
    updateCamp.fecha_final = fecha_final;
    updateCamp.id_cultivo = id_cultivo;
    await updateCamp.save();

    res.json(updateCamp);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCampania = async (req, res) => {
  try {
    const { id } = req.params;

    await CampaniasModelo.destroy(
      {
        where: {
          id_campania: id,
        },
      },
      console.log(id)
    );

    res.status(200).json({
      message: `El Campania ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
