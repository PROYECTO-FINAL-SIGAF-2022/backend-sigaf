// validar datos de usuario con express-validator

import { check, validationResult } from "express-validator";
import { UsuariosModelo } from "../models/Usuarios.model";

const validadorDeCampos = [
  check("nombre_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido"),
  check("apellido_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido es requerido"),
  check("dni_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El dni es requerido"),
  check("fecha_nac_persona")
  // TODO: validar que sea una fecha
    .exists()
    .withMessage("La fecha de nacimiento es requerida"),
  check("telefono_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El telefono es requerido"),
  check("username_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El username es requerido"),
  check("password_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El password es requerido"),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(406).json({
        msg: "Error en los datos",
        errores: error.mapped(),
      });
    }
  },
];

const existUser = async (req, res, next) => {
  const { username_usuario } = req.body;
  const usuario = await UsuariosModelo.findOne({
    where: { username_usuario },
  });
  if (usuario) {
    res.status(406).json({
      msg: "El usuario ya existe",
    });
    return;
  }
  next();
};

export { validadorDeCampos, existUser };
