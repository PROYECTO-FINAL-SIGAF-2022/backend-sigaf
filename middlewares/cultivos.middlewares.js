import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";

import { CultivosModelo } from "../models/Cultivos.model.js";

export const getCultivosMidd = [verificarCampos];

export const getCultivoMidd = [
  param("id").custom(
    async (id_cultivo) => {
      const cultivo = await CultivosModelo.count({
        where: { id_cultivo },
      });

      if (cultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postCultivoMidd = [
  check("descripcion_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El cultivo es requerido")
    .custom(
      async (descripcion_cultivo) => {
        const cultivo = await CultivosModelo.count({
          where: { descripcion_cultivo },
        });
        // console.log(cultivo);
        if (cultivo > 0) {
          return Promise.reject("El cultivo ingresado ya se encuentra en la bd");
        }
      },

    ),
  verificarCampos,
];

export const putCultivoMidd = [
  param("id").custom(
    async (id_cultivo) => {
      const cultivo = await CultivosModelo.count({
        where: { id_cultivo },
      });

      if (cultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El cultivo es requerido")
    .custom(
      async (descripcion_cultivo) => {
        const cultivo = await CultivosModelo.count({
          where: { descripcion_cultivo },
        });
        // console.log(cultivo);
        if (cultivo > 0) {
          return Promise.reject("El cultivo ingresado ya se encuentra en la bd");
        }
      },

    ),
  verificarCampos,
];
export const deleteCultivoMidd = [
  param("id").custom(
    async (id_cultivo) => {
      const cultivo = await CultivosModelo.count({
        where: { id_cultivo },
      });

      if (cultivo === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
