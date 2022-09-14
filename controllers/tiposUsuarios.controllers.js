import { logSistema } from "../helpers/createLog.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";

// Devuelve todos los Tipo_usuarios de la colección
export const getTiposUsuarios = async (req, res) => {
  try {
    const tipoUsu = await TiposUsuariosModelo.findAll({where: { activo: true }}); // consulta para todos los documentos
    // Respuesta del servidor
    res.json(tipoUsu);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipoUsuarioUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoUsu = await TiposUsuariosModelo.findByPk(id); // consulta para todos los documentos

    
    await logSistema(req.decoded, eliminarTipoProdcuto.dataValues, "busqueda");

    // Respuesta del servidor
    res.json(tipoUsu);
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

    await logSistema(req.decoded, nuevoTipo_Usuario.dataValues, "creacion");

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


    const updateTipoUser = await TiposUsuariosModelo.findOne({
      where: { id_tipo_usuario: id },
    });
    updateTipoUser.descripcion_tipo_usuario = descripcion_tipo_usuario;
    await updateTipoUser.save();

    await logSistema(req.decoded, updateTipoUser.dataValues, "actualizacion");

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

    await logSistema(req.decoded, eliminarTipoUsuario.dataValues, "eliminacion");

    res.status(200).json({
      message: `El Tipo_Usuario con id ${id} se elimino correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
