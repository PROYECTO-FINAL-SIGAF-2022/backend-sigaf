import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MaquinasModelo } from "../models/Maquinas.model.js";

export const getMaquinasMidd = [verificarCampos];

export const getMaquinaMidd = [
  param("id").custom(
    async (id_maquina) => {
      const maquina = await MaquinasModelo.count({
        where: { id_maquina },
      });

      if (maquina === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postMaquinaMidd = [
  check("descripcion_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la maquina es requerida")
    .custom(
      async (descripcion_maquina) => {
        const maquina = await MaquinasModelo.count({
          where: { descripcion_maquina },
        });
          // console.log(maquina);
        if (maquina > 0) {
          return Promise.reject("La descripcion de maquina ingresada ya se encuentra en la bd");
        }
      },
    ),
  check("tipo_adquisicion_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (tipo_adquisicion_maquina) => {
        const tipoAdquisicionBd = MaquinasModelo.rawAttributes.tipo_adquisicion_maquina.values;

        if (!tipoAdquisicionBd.includes(tipo_adquisicion_maquina)) {
          return Promise.reject("El tipo de adquisicion no esta permitida por el sistema");
        }
      },
    ),
  check("precio_adquisicion_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio de adquisicion es requerida"),
  verificarCampos,
];

export const putMaquinasMidd = [
  param("id").custom(
    async (id_maquina) => {
      const maquina = await MaquinasModelo.count({
        where: { id_maquina },
      });

      if (maquina === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la maquina es requerida")
    .custom(
      async (descripcion_maquina, { req }) => {
        const id_maquina = req.params.id;
        const maquina = await MaquinasModelo.count({
          where: { descripcion_maquina, id_maquina: { [Op.not]: id_maquina } },
        });
          // console.log(maquina);
        if (maquina > 0) {
          return Promise.reject("La descripcion de la maquina ingresada ya se encuentra en la bd");
        }
      },
    ),
  check("tipo_adquisicion_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (tipo_adquisicion_maquina) => {
        const tipoAdquisicionBd = MaquinasModelo.rawAttributes.tipo_adquisicion_maquina.values;

        if (!tipoAdquisicionBd.includes(tipo_adquisicion_maquina)) {
          return Promise.reject("El tipo de adquisicion no esta permitida por el sistema");
        }
      },
    ),
  check("precio_adquisicion_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio de adquisicion es requerida"),
  verificarCampos,
];
export const deleteMaquinaMidd = [
  param("id").custom(
    async (id_maquina) => {
      const maquina = await MaquinasModelo.count({
        where: { id_maquina },
      });

      if (maquina === 0) {
        return Promise.reject();
      }
    },
  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];

export const putMaquinasVenderMidd = [
  param("id").custom(
    async (id_maquina) => {
      const maquina = await MaquinasModelo.count({
        where: { id_maquina },
      });

      if (maquina === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("precio_venta_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio de venta es requerida"),
  // check("fecha_venta_maquina")
  //   .exists()
  //   .not()
  //   .isEmpty()
  //   .withMessage("La fecha de venta es requerida"),
  verificarCampos,
];
