// validar datos de usuario con express-validator

import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getParcelaCultivosMidd = [verificarCampos];

export const getParcelaCultivoMidd = [
  param("id").custom(
    async (id_parcela_cultivo) => {
      const parcelaCultivo = await ParcelasCultivosModelo.count({
        where: { id_parcela_cultivo },
      });

      if (parcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postParcelaCultivosMidd = [
  check("id_parcela")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de parcela es requerido")
    .custom(
      async (id_parcela) => {
        const parcela = await ParcelasModelo.count({
          where: { id_parcela },
        });

        if (parcela === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),

  check("id_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de cultivo es requerido")
    .custom(
      async (id_cultivo) => {
        const cultivo = await CultivosModelo.count({
          where: { id_cultivo },
        });

        if (cultivo === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),
  check("id_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de campania es requerido")
    .custom(
      async (id_campania) => {
        const campania = await CampaniasModelo.count({
          where: { id_campania },
        });

        if (campania === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),
  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de unidad de medida es requerido")
    .custom(
      async (id_unidad_medida) => {
        const UniMedida = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });

        if (UniMedida === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),
  check("cantidad_sembrada")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de unidad de medida es requerido"),

  verificarCampos,
];

export const updateParcelaCultivosMidd = [
  param("id").custom(
    async (id_parcela_cultivo) => {
      const parcelaCultivo = await ParcelasCultivosModelo.count({
        where: { id_parcela_cultivo },
      });

      if (parcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("id_parcela")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de parcela es requerido")
    .custom(
      async (id_parcela) => {
        const parcela = await ParcelasModelo.count({
          where: { id_parcela },
        });

        if (parcela === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),

  check("id_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de cultivo es requerido")
    .custom(
      async (id_cultivo) => {
        const cultivo = await CultivosModelo.count({
          where: { id_cultivo },
        });

        if (cultivo === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),
  check("id_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de campania es requerido")
    .custom(
      async (id_campania) => {
        const campania = await CampaniasModelo.count({
          where: { id_campania },
        });

        if (campania === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),
  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de unidad de medida es requerido")
    .custom(
      async (id_unidad_medida) => {
        const UniMedida = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });

        if (UniMedida === 0) {
          return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
        }
      },
    ),
  check("cantidad_sembrada")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de unidad de medida es requerido"),

  verificarCampos,
];

export const deleteParcelaCultivosMidd = [
  param("id").custom(
    async (id_parcela_cultivo) => {
      const parcelaCultivo = await ParcelasCultivosModelo.count({
        where: { id_parcela_cultivo },
      });

      if (parcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,

];
