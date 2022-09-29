import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

export const getUsuariosMidd = [verificarCampos];

export const getUsuarioMidd = [
  param("id").custom(
    async (id_usuario) => {
      const usuario = await UsuariosModelo.count({
        where: { id_usuario },
      });

      if (usuario === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postUsuariosMidd = [
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
    .withMessage("El dni es requerido")
    .custom(
      async (dni_persona) => {
        const usuario = await UsuariosModelo.count({
          where: { dni_persona },
        });

        if (usuario > 0) {
          return Promise.reject("El dni ingresado ya se encuentra registrado en la bd");
        }
      },
    ),
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
  verificarCampos,
];

export const updateUsuariosMidd = [
  param("id").custom(
    async (id_usuario) => {
      const usuario = await UsuariosModelo.count({
        where: { id_usuario },
      });

      if (usuario === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("nombre_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre es requerido")
    .custom(
      async (nombre_persona, { req }) => {
        try {
          const id_usuario = req.params.id;
          const usuario = await UsuariosModelo.count({
            where: { nombre_persona, id_usuario: { [Op.not]: id_usuario } },
          });
          if (usuario > 0) {
            return Promise.reject("El nombre del usuario ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("apellido_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El apellido es requerido")
    .custom(
      async (apellido_persona, { req }) => {
        try {
          const id_usuario = req.params.id;
          const usuario = await UsuariosModelo.count({
            where: { apellido_persona, id_usuario: { [Op.not]: id_usuario } },
          });
          if (usuario > 0) {
            return Promise.reject("El apellido del usuario ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("dni_persona")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El dni es requerido")
    .custom(
      async (dni_persona, { req }) => {
        try {
          const id_usuario = req.params.id;
          const usuario = await UsuariosModelo.count({
            where: { dni_persona, id_usuario: { [Op.not]: id_usuario } },
          });
          if (usuario > 0) {
            return Promise.reject("El dni del usuario ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("fecha_nac_persona")
    // TODO: validar que sea una fecha
    .exists()
    .withMessage("La fecha de nacimiento es requerida")
    .custom(
      async (fecha_nac_persona, { req }) => {
        try {
          const id_usuario = req.params.id;
          const usuario = await UsuariosModelo.count({
            where: { fecha_nac_persona, id_usuario: { [Op.not]: id_usuario } },
          });
          if (usuario > 0) {
            return Promise.reject("La fecha de nacimiento del usuario ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("email_persona")
    .isEmail()
    .withMessage("El correo ingresado no es un correo valido")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El correo de la persona es requerida")
    .custom(async (email_persona) => {
      const usuario = await UsuariosModelo.count({
        where: { email_persona },
      });
      // console.log(usuario);
      if (usuario > 0) {
        return Promise.reject(
          "El correo ingresado ingresado ya se encuentra en la bd",
        );
      }
    }),
  check("telefono_persona")

    .not()
    .isEmpty()
    .withMessage("El telefono es requerido")
    .custom(
      async (telefono_persona, { req }) => {
        try {
          const id_usuario = req.params.id;
          const usuario = await UsuariosModelo.count({
            where: { telefono_persona, id_usuario: { [Op.not]: id_usuario } },
          });
          if (usuario > 0) {
            return Promise.reject("El nuemero de telefono del usuario ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("username_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El username es requerido")
    .custom(
      async (username_usuario, { req }) => {
        try {
          const id_usuario = req.params.id;
          const usuario = await UsuariosModelo.count({
            where: { username_usuario, id_usuario: { [Op.not]: id_usuario } },
          });
          if (usuario > 0) {
            return Promise.reject("El nombre de usuario del usuario ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("password_usuario")

    .not()
    .isEmpty()
    .withMessage("El password es requerido"),
  // .custom(
  //   async (password_usuario, { req }) => {
  //     try {
  //       const id_usuario = req.params.id;
  //       const usuario = await UsuariosModelo.count({
  //         where: { password_usuario, id_usuario: { [Op.not]: id_usuario } },
  //       });
  //       // console.log(proveedor);
  //       if (usuario > 0) {
  //         return Promise.reject("La contraseña de usuario de telefono de nacimiento del usuario ingresado ya se encuentra en la bd");
  //       }
  //     } catch (error) {
  //       // console.log(error);
  //       return Promise.reject(error);
  //     }
  //   },
  // ),
  verificarCampos,
];

export const deleteUsuariosMidd = [
  param("id").custom(
    async (id_usuario) => {
      const usuario = await ActividadesModelo.count({
        where: { id_usuario },
      });

      if (usuario === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,

];
