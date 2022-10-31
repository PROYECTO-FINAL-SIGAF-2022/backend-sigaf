import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

export const getEstablecimientosMidd = [verificarCampos];

export const getEstablecimientoMidd = [
  param("id").custom(
    async (id_establecimiento) => {
      const establecimiento = await EstablecimientosModelo.count({
        where: { id_establecimiento },
      });

      if (establecimiento === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postEstablecimientoMidd = [
  check("descripcion_establecimiento")
    .exists()
    .not()
    .escape()
    .isEmpty()
    .withMessage("La descripcion del establecimiento es requerido")
    .custom(
      async (descripcion_establecimiento) => {
        const establecimiento = await EstablecimientosModelo.count({
          where: { descripcion_establecimiento },
        });
        if (establecimiento > 0) {
          return Promise.reject("El establecimiento ingresado ya se encuentra en la bd");
        }
      },

    ),
  check("georeferencia")
    .exists()
    .not()
    .escape()
    .isEmpty()
    .withMessage("La georeferencia del establecimiento es requerido"),
  check("superficie")
    .exists()
    .not()
    .escape()
    .isEmpty()
    .withMessage("La superficie del establecimiento es requerido"),
  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id usuario no puede estar vacio")
    .custom(
      async (id_usuario) => {
        const usuario = await UsuariosModelo.count({
          where: { id_usuario },
        });

        if (usuario === 0) {
          return Promise.reject("El id de usuario enviado no se encuentra en la bd");
        }
      },
    ),
  verificarCampos,
];

export const putEstablecimientoMidd = [
  param("id").custom(
    async (id_establecimiento) => {
      const establecimiento = await EstablecimientosModelo.count({
        where: { id_establecimiento },
      });

      if (establecimiento === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_establecimiento")
    .exists()
    .not()
    .escape()
    .isEmpty()
    .withMessage("La descripcion del establecimiento es requerido")
    .custom(
      async (descripcion_establecimiento) => {
        const establecimiento = await EstablecimientosModelo.count({
          where: { descripcion_establecimiento },
        });
        if (establecimiento > 0) {
          return Promise.reject("El establecimiento ingresado ya se encuentra en la bd");
        }
      },

    ),
  check("georeferencia")
    .exists()
    .not()
    .escape()
    .isEmpty()
    .withMessage("La georeferencia del establecimiento es requerido"),
  check("superficie")
    .exists()
    .not()
    .escape()
    .isEmpty()
    .withMessage("La superficie del establecimiento es requerido"),
  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id usuario no puede estar vacio")
    .custom(
      async (id_usuario) => {
        const usuario = await UsuariosModelo.count({
          where: { id_usuario },
        });

        if (usuario === 0) {
          return Promise.reject("El id de usuario enviado no se encuentra en la bd");
        }
      },

    ),
  verificarCampos,
];

export const deleteEstablecimientoMidd = [
  param("id")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id establecimiento no puede estar vacio")
    .custom(
      async (id_establecimiento) => {
        const establecimiento = await EstablecimientosModelo.count({
          where: { id_establecimiento },
        });

        if (establecimiento === 0) {
          return Promise.reject("El id ingresado no pertenece a ningun registro de la bd");
        }
      },

    )
    .withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
