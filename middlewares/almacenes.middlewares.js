import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { AlmacenesModelo } from "../models/Almacenes.model.js";

export const getAlmacenesMidd = [verificarCampos];

export const getAlmacenMidd = [
  param("id").custom(
    async (id_almacen) => {
      const almacen = await AlmacenesModelo.count({
        where: { id_almacen },
      });

      if (almacen === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postAlmacenesMidd = [
  check("descripcion_almacen")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del almacen es requerida")
    .custom(
      async (descripcion_almacen) => {
        const almacen = await AlmacenesModelo.count({
          where: { descripcion_almacen },
        });
          // console.log(almacen);
        if (almacen > 0) {
          return Promise.reject("La descripcion de almacen ingresada ya se encuentra en la bd");
        }
      },
    ),
  check("tipo_adquisicion")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (tipo_adquisicion) => {
        const tipoAdquisicionBd = AlmacenesModelo.rawAttributes.tipo_adquisicion.values;

        if (!tipoAdquisicionBd.includes(tipo_adquisicion)) {
          return Promise.reject("El tipo de adquisicion no esta permitida por el sistema");
        }
      },
    ),
  check("precio_adquisicion")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio de adquisicion es requerida"),
  verificarCampos,
];
export const putAlmacenesMidd = [
  param("id").custom(
    async (id_almacen) => {
      const almacen = await AlmacenesModelo.count({
        where: { id_almacen },
      });

      if (almacen === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_almacen")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del almacen es requerida")
    .custom(
      async (descripcion_almacen, { req }) => {
        const id_almacen = req.params.id;
        const almacen = await AlmacenesModelo.count({
          where: { descripcion_almacen, id_almacen: { [Op.not]: id_almacen } },
        });
          // console.log(almacen);
        if (almacen > 0) {
          return Promise.reject("La descripcion de almacen ingresada ya se encuentra en la bd");
        }
      },
    ),
  check("tipo_adquisicion")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (tipo_adquisicion) => {
        const tipoAdquisicionBd = AlmacenesModelo.rawAttributes.tipo_adquisicion.values;

        if (!tipoAdquisicionBd.includes(tipo_adquisicion)) {
          return Promise.reject("El tipo de adquisicion no esta permitida por el sistema");
        }
      },
    ),
  check("precio_adquisicion")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio de adquisicion es requerida"),
  verificarCampos,
];
export const deleteAlmacenMidd = [
  param("id").custom(
    async (id_almacen) => {
      const almacen = await AlmacenesModelo.count({
        where: { id_almacen },
      });

      if (almacen === 0) {
        return Promise.reject();
      }
    },
  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];

export const putAlmacenesVenderMidd = [
  param("id").custom(
    async (id_almacen) => {
      const almacen = await AlmacenesModelo.count({
        where: { id_almacen },
      });

      if (almacen === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("precio_venta")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio de venta es requerida"),
  // check("fecha_venta")
  //   .exists()
  //   .not()
  //   .isEmpty()
  //   .withMessage("La fecha de venta es requerida"),
  verificarCampos,
];
