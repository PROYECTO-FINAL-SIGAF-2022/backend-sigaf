import bcrypt from 'bcryptjs';
import { generarJwt } from '../helpers/generarJwt.js';

import { UsuariosModelo } from '../models/Usuarios.model.js';

export const loguearse = async (req, res) => {
  const { username_usuario, password_usuario } = req.body;
  //   console.log(username_usuario, password_usuario);
  const usuario = await UsuariosModelo.findOne({
    where: { username_usuario: username_usuario },
  });
  //   console.log(usuario);
  if (!usuario) {
    res.json({
      msg: 'El usuario no existe',
    });
    return;
  }

  const passwordEncriptado = bcrypt.compareSync(
    password_usuario,
    usuario.password_usuario
  );
  if (!passwordEncriptado) {
    res.json({
      msg: 'El password no es valido',
    });

    return;
  }

  // generar el token
  const { id_usuario, nombre_persona, apellido_persona } = usuario;
  const token = await generarJwt({
    id_usuario,
    nombre_persona,
    apellido_persona,
  });

  res.json({
    // msg: 'El usuario se logueo correctamente',
    token,
  });
};

export const registrarse = async (req, res) => {
  const {
    nombre_persona,
    apellido_persona,
    dni_persona,
    fecha_nac_persona,
    telefono_persona,
    username_usuario,
    password_usuario,
    id_tipo_usuario,
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
    id_tipo_usuario,
  });

  // generar el token
  const { id_usuario } = nuevoUsuario;
  const token = await generarJwt({
    id_usuario,
    nombre_persona,
    apellido_persona,
  });

  res.json({
    msg: 'El usuario se creo Correctamente',
    token,
  });
};
