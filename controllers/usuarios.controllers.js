import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

// Devuelve todos los usuarios de la colección
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuariosModelo.findAll({
      include: {
        model: TiposUsuariosModelo,
      },
      where: { 
        activo: true 
      },
    }); // consulta para todos los documentos

    res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsuarioUnico = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UsuariosModelo.findByPk(id, {
      include: {
        model: TiposUsuariosModelo,
      },
    }); // consulta para todos los documentos

    // Respuesta del servidor
    if (usuario) {
      res.json(usuario);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postUsuario = async (req, res) => {
  try {
    const {
      nombre_persona,
      apellido_persona,
      dni_persona,
      fecha_nac_persona,
      email_persona,
      telefono_persona,
      username_usuario,
      password_usuario,
      id_tipo_usuario,
    } = req.body;

    const idTipoUsuario = id_tipo_usuario || 1;

    const nuevoUsuario = await UsuariosModelo.create({
      nombre_persona,
      apellido_persona,
      dni_persona,
      fecha_nac_persona,
      email_persona,
      telefono_persona,
      username_usuario,
      password_usuario,
      id_tipo_usuario: idTipoUsuario,
    });

    res.status(201).json({
      msg: "El usuario se creo Correctamente",
      nuevo_usuario: nuevoUsuario,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_persona,
      apellido_persona,
      dni_persona,
      fecha_nac_persona,
      telefono_persona,
      email_persona,
      username_usuario,
      password_usuario,
      id_tipo_usuario,
    } = req.body;
    // console.log(id);
    const updateUser = await UsuariosModelo.findOne({
      where: { id_usuario: id },
    });
    updateUser.nombre_persona = nombre_persona;
    updateUser.apellido_persona = apellido_persona;
    updateUser.dni_persona = dni_persona;
    updateUser.fecha_nac_persona = fecha_nac_persona;
    updateUser.email_persona = email_persona;
    updateUser.telefono_persona = telefono_persona;
    updateUser.username_usuario = username_usuario;
    updateUser.password_usuario = password_usuario;
    updateUser.id_tipo_usuario = id_tipo_usuario;
    await updateUser.save();

    res.status(200).json({
      msg: "El usuario se actualizo Correctamente",
      updateUser,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminarUsuario = await UsuariosModelo.findOne(
      { where: { id_usuario: id } },

    );

    eliminarUsuario.activo = false;

    await eliminarUsuario.save();

    res.status(200).json({
      msg: `El usuario con id ${id} se ha eliminado correctamente`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
