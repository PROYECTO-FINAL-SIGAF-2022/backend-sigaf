import { check } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

export const postAuthLoginMidd = [
  check("username_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de usuario es requerido"),
  check("password_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La contraseña es requerida"),
  verificarCampos,
];
// nombre_persona
// apellido_persona
// dni_persona
// fecha_nac_persona
// email_persona
// telefono_persona
// username_usuario
// password_usuario
// id_tipo_usuario
export const postAuthRegisterMidd = [
  check("nombre_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre de la persona es requerida"),
  check("apellido_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido de la persona es requerida"),
  check("dni_persona")
    .exists()
    .not()
    .withMessage("El dni de la persona es requerida")
    .isEmpty()
    .isNumeric()
    .withMessage("El dni debe ser numerico")
    .isLength(8)
    .withMessage("El dni debe ser de una longitud de 8 numero")

    .custom(
      async (dni_persona) => {
        const usuario = await UsuariosModelo.count({
          where: { dni_persona },
        });
        // console.log(usuario);
        if (usuario > 0) {
          return Promise.reject("El dni de usuario ingresado ya se encuentra en la bd");
        }
      },
    ),
  check("fecha_nac_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de nacimiento de la persona es requerida"),
  check("email_persona")
    .isEmail()
    .withMessage("El correo ingresado no es un correo valido")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El correo de la persona es requerida"),
  check("telefono_persona")
    .isNumeric()
    .withMessage("El telefono solo puede contener numeros")
    .isLength(10)
    .withMessage("El numero de telefono debe de ser de 10 numeros")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El telefono de la persona es requerida"),
  check("username_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El usuario de la persona es requerida")
    .custom(
      async (username_usuario) => {
        const usuario = await UsuariosModelo.count({
          where: { username_usuario },
        });
        // console.log(usuario);
        if (usuario > 0) {
          return Promise.reject("El nombre de usuario ingresado ya se encuentra en la bd");
        }
      },
    ),
  check("password_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El password de la persona es requerida"),
  verificarCampos,
];
