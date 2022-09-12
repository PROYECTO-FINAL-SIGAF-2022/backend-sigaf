import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";

export const getTiposProductosMidd = [verificarCampos];

export const getTipoProductoMidd = [
  param("id").custom(
    async (id_tipo_producto) => {
      const actividad = await TiposProductosModelo.count({
        where: { id_tipo_producto },
      });

      if (actividad === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postTipoProductoMidd = [
  check("descripcion_tipo_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion para el tipo de producto es requerida")
    .custom(
      async (descripcion_tipo_producto) => {
        const tipoProducto = await TiposProductosModelo.count({
          where: { descripcion_tipo_producto },
        });
        // console.log(tipoProducto);
        if (tipoProducto > 0) {
          return Promise.reject("La descripcion del tipo producto ingresado ya se encuentra en la bd");
        }
      },

    ),
  verificarCampos,
];

export const putTipoProductoMidd = [
  param("id").custom(
    async (id_tipo_producto) => {
      const tipoProducto = await TiposProductosModelo.count({
        where: { id_tipo_producto },
      });

      if (tipoProducto === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_tipo_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del tipo de producto es requerida")
    .custom(
      async (descripcion_tipo_producto) => {
        const tipoProducto = await TiposProductosModelo.count({
          where: { descripcion_tipo_producto },
        });
        // console.log(tipoProducto);
        if (tipoProducto > 0) {
          return Promise.reject("La descripcion del tipo producto ingresada ya se encuentra en la bd");
        }
      },

    ),
  verificarCampos,
];
export const deleteTipoProductoMidd = [
  param("id").custom(
    async (id_tipo_producto) => {
      const tipoProducto = await TiposProductosModelo.count({
        where: { id_tipo_producto },
      });

      if (tipoProducto === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
