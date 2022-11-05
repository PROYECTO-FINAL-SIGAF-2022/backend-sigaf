import { check, param } from "express-validator";
// import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ContabilidadModelo } from "../models/Contabilidad.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";

export const getContabilidadesMidd = [verificarCampos];

export const getContabilidadMidd = [
  param("id").custom(
    async (id_contabilidad) => {
      const contabilidad = await ContabilidadModelo.count({
        where: { id_contabilidad },
      });

      if (contabilidad === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postContabilidadMidd = [
  check("descripcion_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de contabilidad es requerida"),
  check("observacion_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La obervacion de contabildiad es requerida")
    .custom(
      async (observacion_contabilidad) => {
        const tipoObservacion = ContabilidadModelo.rawAttributes.observacion_contabilidad.values;

        if (!tipoObservacion.includes(observacion_contabilidad)) {
          return Promise.reject("El tipo de observacion enviada no esta permitida por el sistema");
        }
      },
    ),
  check("tipo_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de contabilidad es requerida")
    .custom(
      async (tipo_contabilidad) => {
        const tipoContabilidad = ContabilidadModelo.rawAttributes.tipo_contabilidad.values;

        if (!tipoContabilidad.includes(tipo_contabilidad)) {
          return Promise.reject("El tipo de contabilidad enviada no esta permitida por el sistema");
        }
      },
    ),
  check("monto_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La obervacion de contabilidad es requerida"),
  check("id_parcela_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de la parcela cultivo es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        const parcelaCultivo = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
          // console.log(parcelaCultivo);
        if (parcelaCultivo === 0) {
          return Promise.reject("El id de la parcela cultivo ingresada no se encuentra en la bd");
        }
      },
    ),
  verificarCampos,
];

export const putContabilidadMidd = [
  param("id").custom(
    async (id_contabilidad) => {
      const contabilidad = await ContabilidadModelo.count({
        where: { id_contabilidad },
      });

      if (contabilidad === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de contabilidad es requerida"),
  check("observacion_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La obervacion de contabildiad es requerida")
    .custom(
      async (observacion_contabilidad) => {
        const tipoObservacion = ContabilidadModelo.rawAttributes.observacion_contabilidad.values;

        if (!tipoObservacion.includes(observacion_contabilidad)) {
          return Promise.reject("El tipo de observacion enviada no esta permitida por el sistema");
        }
      },
    ),
  check("tipo_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de contabilidad es requerida")
    .custom(
      async (tipo_contabilidad) => {
        const tipoContabilidad = ContabilidadModelo.rawAttributes.tipo_contabilidad.values;

        if (!tipoContabilidad.includes(tipo_contabilidad)) {
          return Promise.reject("El tipo de contabilidad enviada no esta permitida por el sistema");
        }
      },
    ),
  check("monto_contabilidad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La obervacion de contabilidad es requerida"),
  check("id_parcela_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de la parcela cultivo es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        const parcelaCultivo = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
          // console.log(parcelaCultivo);
        if (parcelaCultivo === 0) {
          return Promise.reject("El id de la parcela cultivo ingresada no se encuentra en la bd");
        }
      },
    ),
  verificarCampos,
];
export const deleteContabilidadMidd = [
  param("id").custom(
    async (id_contabilidad) => {
      const contabilidad = await ContabilidadModelo.count({
        where: { id_contabilidad },
      });

      if (contabilidad === 0) {
        return Promise.reject();
      }
    },
  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];

// export const putMaquinasVenderMidd = [
//   param("id").custom(
//     async (id_maquina) => {
//       const maquina = await MaquinasModelo.count({
//         where: { id_maquina },
//       });

//       if (maquina === 0) {
//         return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
//       }
//     },
//   ),
//   check("precio_venta_maquina")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("El precio de venta es requerida"),
//   check("fecha_venta_maquina")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("La fecha de venta es requerida"),
//   verificarCampos,
// ];
