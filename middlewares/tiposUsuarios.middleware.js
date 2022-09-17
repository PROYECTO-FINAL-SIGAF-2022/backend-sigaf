import { check, param } from "express-validator";
import { Op } from "sequelize";
import { getVerificarRutasSistema } from "../helpers/getVerificarRutasSistema.js";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";

export const getTiposUsuariosMidd = [verificarCampos];

export const getTipoUsuarioMidd = [
  param("id").custom(
    async (id_tipo_usuario) => {
      const tipoUsuario = await TiposUsuariosModelo.count({
        where: { id_tipo_usuario },
      });

      if (tipoUsuario === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postTipoUsuarioMidd = [
  check("descripcion_tipo_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del tipo de usuario es requerido")
    .custom(
      async (descripcion_tipo_usuario) => {
        const tipoUsuario = await TiposUsuariosModelo.count({
          where: { descripcion_tipo_usuario },
        });
        if (tipoUsuario > 0) {
          return Promise.reject("El tipo de producto ingresado ya se encuentra en la bd");
        }
      },

    ),
  check("rutas_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Las rutas del tipo de usuario es requerido")
    .isArray()
    .withMessage("Las rutas del tipo usuario debe ser un arreglo")
    .custom(
      async (rutas_usuario) => {
        // console.log(rutas_usuario);
        const resultUsuario = getVerificarRutasSistema(rutas_usuario);
        // console.log(resultUsuario);
        if (!resultUsuario) {
          return Promise.reject(resultUsuario);
        }
      },

    ),
  verificarCampos,
];

export const putTipoUsuarioMidd = [
  param("id").custom(
    async (id_tipo_usuario) => {
      const tipoUsuario = await TiposUsuariosModelo.count({
        where: { id_tipo_usuario },
      });

      if (tipoUsuario === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_tipo_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El Tipo de Producto es requerido")
    .custom(
      async (descripcion_tipo_usuario, { req }) => {
        const id_tipo_usuario = req.params.id;

        try {
          const tipoUsuario = await TiposUsuariosModelo.count({
            where: { descripcion_tipo_usuario, id_tipo_usuario: { [Op.not]: id_tipo_usuario } },
          });

          if (tipoUsuario > 0) {
            return Promise.reject("El tipo de producto ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          return Promise.reject(error);
        }
      },
    ),
  check("rutas_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Las rutas del tipo de usuario es requerido")
    .isArray()
    .withMessage("Las rutas del tipo usuario debe ser un arreglo")
    .custom(
      async (rutas_usuario) => {
        // console.log(rutas_usuario);
        const resultUsuario = getVerificarRutasSistema(rutas_usuario);
        // console.log(resultUsuario);
        if (!resultUsuario) {
          return Promise.reject(resultUsuario);
        }
      },

    ),
  verificarCampos,
];

export const deleteTipoUsuarioMidd = [
  param("id").custom(
    async (id_tipo_usuario) => {
      const tipoUsuario = await TiposUsuariosModelo.count({
        where: { id_tipo_usuario },
      });

      if (tipoUsuario === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
