// validar datos de los productos con express-validator
import { check, param } from "express-validator";
import { ProductosModelo } from "../models/Productos.model.js";
import { verificarCampos } from "../helpers/verificarCampos.js";


export const getProductosMidd = [verificarCampos];

export const getProductoMidd = [
  param("id").custom(
    async (id_producto) => {
      const producto = await ProductosModelo.count({
        where: { id_producto },
      });

      if (producto === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postProductoMidd = [
  check("descripcion_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del producto es requerido")
    .custom(
      async (descripcion_producto) => {
        const producto = await CultivosModelo.count({
          where: { descripcion_producto },
        });
        if (producto > 0) {
          return Promise.reject("El producto ingresado ya se encuentra en la bd");
        }
      },

    ),
    check("fecha_vencimiento_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de vencimiento del producto es requerido"),
    check("cantidad_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad del producto es requerido"),
    verificarCampos,
];

export const putProductoMidd = [
  param("id").custom(
    async (id_producto) => {
      const producto = await ProductosModelo.count({
        where: { id_producto },
      });

      if (producto === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El Producto es requerido")
    .custom(
      async (descripcion_producto) => {
        const producto = await ProductosModelo.count({
          where: { descripcion_producto },
        });
       
        if (producto > 0) {
          return Promise.reject("El producto ingresado ya se encuentra en la bd");
        }
      },

    ),
    check("fecha_vencimiento_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de vencimiento del producto es requerido"),
    check("cantidad_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad del producto es requerido"),
  verificarCampos,
];

export const deleteCultivoMidd = [
  param("id").custom(
    async (id_producto) => {
      const producto = await ProductosModelo.count({
        where: { id_producto },
      });

      if (producto === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
