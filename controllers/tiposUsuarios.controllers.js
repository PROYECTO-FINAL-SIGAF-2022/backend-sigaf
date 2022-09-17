import { logSistema } from "../helpers/createLog.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";

export const getTiposUsuarios = async (req, res) => {
  try {
    const tipoUsuarios = await TiposUsuariosModelo.findAll({ where: { activo: true } });
    res.status(200).json(tipoUsuarios);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipoUsuarioUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoUsuario = await TiposUsuariosModelo.findByPk(id);

    await logSistema(req.decoded, tipoUsuario.dataValues, "busqueda");

    res.json(tipoUsuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postTipoUsuario = async (req, res) => {
  try {
    const { descripcion_tipo_usuario, rutas_usuario } = req.body;

    const nuevoTipoUsuario = await TiposUsuariosModelo.create({
      descripcion_tipo_usuario,
      rutas_usuario,
    });

    await logSistema(req.decoded, nuevoTipoUsuario.dataValues, "creacion");

    res.status(201).json({
      msg: "El Tipo_Usuario se creo Correctamente",
      nuevoTipoUsuario,
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
    const { descripcion_tipo_usuario, rutas_usuario } = req.body;

    const updateTipoUsario = await TiposUsuariosModelo.findOne({
      where: { id_tipo_usuario: id },
    });
    updateTipoUsario.descripcion_tipo_usuario = descripcion_tipo_usuario;
    updateTipoUsario.rutas_usuario = rutas_usuario;
    await updateTipoUsario.save();

    await logSistema(req.decoded, updateTipoUsario.dataValues, "actualizacion");

    res.status(200).json({
      msg: "El Tipo_Usuario se actualizo Correctamente",
      updateTipoUsario,
    });
  } catch (error) {
    console.log(error);
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
