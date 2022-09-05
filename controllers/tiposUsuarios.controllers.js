import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";

// Devuelve todos los Tipo_usuarios de la colección
export const getTiposUsuarios = async (req, res) => {
  try {
    const Datos = await TiposUsuariosModelo.findAll(); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipoUsuarioUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const Datos = await TiposUsuariosModelo.findByPk(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(Datos);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postTipoUsuario = async (req, res) => {
  try {
    const { descripcion_tipo_usuario } = req.body;

    const nuevoTipo_Usuario = await TiposUsuariosModelo.create({
      descripcion_tipo_usuario,
    });

    res.json({
      msg: "El Tipo_Usuario se creo Correctamente",
      nuevoTipo_Usuario,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTipoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion_tipo_usuario } = req.body[0];

    console.log(id);

    const updateTipoUser = await TiposUsuariosModelo.findOne({
      where: { id_tipo_usuario: id },
    });
    updateTipoUser.descripcion_tipo_usuario = descripcion_tipo_usuario;
    await updateTipoUser.save();

    res.json({
      msg: "El Tipo_Usuario se actualizo Correctamente",
      updateTipoUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteTipoUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarTipoUsuario = await TiposUsuariosModelo.findOne(
      { where: { id_tipo_usuario: id } },

    );

    eliminarTipoUsuario.activo = false;

    await eliminarTipoUsuario.save();

    res.status(200).json({
      message: `El Tipo_Usuario con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
