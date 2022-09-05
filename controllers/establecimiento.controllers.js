import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

// Devuelve todos los Establecimientos de la colección
export const getEstablecimientos = async (req, res) => {
  try {
    const Datos = await EstablecimientosModelo.findAll({where: { activo: true }}); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getEstablecimientoUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await EstablecimientosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postEstablecimiento = async (req, res) => {
  try {
    const {
      descripcion_establecimiento,
      georeferencia,
      superficie,
      id_usuario,
    } = req.body;

    const nuevoEstablecimiento = await EstablecimientosModelo.create({
      descripcion_establecimiento,
      georeferencia,
      superficie,
      id_usuario,
    });

    res.json({
      msg: "El Establecimiento se creo Correctamente",
      nuevoEstablecimiento,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateEstablecimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_establecimiento, georeferencia, superficie } = req.body[0];
    console.log(id);
    const UpdateEstab = await EstablecimientosModelo.findOne({
      where: { id_establecimiento: id },
    });
    UpdateEstab.descripcion_establecimiento = descripcion_establecimiento;
    UpdateEstab.georeferencia = georeferencia;
    UpdateEstab.superficie = superficie;
    await UpdateEstab.save();

    res.json({
      msg: "El Establecimiento se actualizo Correctamente",
      UpdateEstab,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteEstablecimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarEstablecimiento = await EstablecimientosModelo.findOne({ where: { id_establecimiento: id } });

    eliminarEstablecimiento.activo = false;

    await eliminarEstablecimiento.save();

    res.status(200).json({
      msg: `El establecimiento con el ID: ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
