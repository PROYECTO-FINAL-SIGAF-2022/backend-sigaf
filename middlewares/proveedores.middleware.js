// validar datos del proveedor con express-validator

import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";

export const getProveedoresMidd = [verificarCampos];

export const getProveedorMidd = [
  param("id").custom(
    async (id_proveedor) => {
      const proveedor = await ProveedoresModelo.count({
        where: { id_proveedor },
      });

      if ( proveedor === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postProveedorMidd = [
  check("nombre_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El proveedor es requerido")
    .custom(
      async (nombre_proveedor) => {
        const proveedor = await ProveedoresModelo.count({
          where: { nombre_proveedor },
        });
        // console.log(actividad);
        if (proveedor > 0) {
          return Promise.reject("El proveedor ingresado ya se encuentra en la bd");
        }
      },

    ),
    check("telefono_proveedor")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El telefono es requerido"),
    check("direccion_proveedor")
      .exists()
      .not()
      .isEmpty()
      .withMessage("La direccion del proveedor es requerido"),
  verificarCampos,
];

export const putProveedorMidd = [
  param("id").custom(
    async (id_proveedor) => {
      const proveedor = await ProveedoresModelo.count({
        where: { id_proveedor },
      });

      if (proveedor === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("nombre_proveedor")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El proveedor es requerido")
      .custom(
      async (nombre_proveedor) => {
        const proveedor = await ProveedoresModelo.count({
          where: { nombre_proveedor },
        });
        
        if (proveedor > 0) {
          return Promise.reject("El proveedor ingresado ya se encuentra en la bd");
        }
      },

    ),
    check("telefono_proveedor")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El telefono es requerido"),
    check("direccion_proveedor")
      .exists()
      .not()
      .isEmpty()
      .withMessage("La direccion del proveedor es requerido"),
  verificarCampos,
];

export const deleteProveedorMidd = [
  param("id").custom(
    async (nombre_proveedor) => {
      const proveedor = await ProveedoresModelo.count({
        where: { nombre_proveedor },
      });

      if (proveedor === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];

