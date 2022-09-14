import bcrypt from "bcryptjs";
import { generarJwt } from "../helpers/generarJwt.js";
import { LogSistema } from "../models/LogSistema.js";

import { UsuariosModelo } from "../models/Usuarios.model.js";

export const loguearse = async (req, res) => {
  const { username_usuario, password_usuario } = req.body;

  try {
    const usuario = await UsuariosModelo.findOne({
      where: { username_usuario },
    });
    console.log(usuario);
    if (!usuario) {
      return res.status(401).json({
        msg: "El usuario no existe",
      });
    }

    const passwordEncriptado = bcrypt.compareSync(
      password_usuario,
      usuario.password_usuario,
    );
    if (!passwordEncriptado) {
      return res.status(401).json({
        msg: "El password no es valido",
      });
    }

    // generar el token
    const { id_usuario } = usuario;
    const token = await generarJwt({ id_usuario });

    await LogSistema.create({
      id_usuario,
      descripcion_log: `El usuario con ID ${id_usuario} ha iniciado sesion`,
    });

    return res.status(200).json({
      token,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const registrarse = async (req, res) => {
  try {
    const {
      nombre_persona,
      apellido_persona,
      dni_persona,
      fecha_nac_persona,
      telefono_persona,
      username_usuario,
      password_usuario,
    } = req.body;

    // encriptar el password
    const passwordEncriptado = bcrypt.hashSync(password_usuario, 10);
    // console.log(passwordEncriptado);

    const nuevoUsuario = await UsuariosModelo.create({
      nombre_persona,
      apellido_persona,
      dni_persona,
      fecha_nac_persona,
      telefono_persona,
      username_usuario,
      password_usuario: passwordEncriptado,
      id_tipo_usuario: 1,
    });

    // generar el token
    const { id_usuario } = nuevoUsuario;
    const token = await generarJwt({ id_usuario });

    // const dataLog = nuevoUsuario.dataValues;

    // console.log(dataLog);

    await LogSistema.create({
      id_usuario,
      descripcion_log: `El usuario con ID ${id_usuario} se ha registrado`,
    });

    res.status(200).json({
      msg: "El usuario se creo Correctamente",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
