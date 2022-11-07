import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";

export const getParcelasMidd = [verificarCampos];

export const getParcelaMidd = [
  param("id").custom(
    async (id_parcela) => {
      const parcela = await ParcelasModelo.count({
        where: { id_parcela },
      });

      if (parcela === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

// georeferencia
// superficie
// id_establecimiento
export const postParcelasMidd = [
  check("georeferencia")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La georeferencia es requerida"),
  check("superficie")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La superficie es requerida"),
  verificarCampos,
];

export const putParcelasMidd = [
  param("id").custom(
    async (id_parcela) => {
      const parcela = await ParcelasModelo.count({
        where: { id_parcela },
      });

      if (parcela === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("georeferencia")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La georeferencia es requerida"),
  check("superficie")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La superficie es requerida"),
  check("descripcion_parcela")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion_parcela es requerida")
    .custom(
      async (descripcion_parcela, { req }) => {
        const id_parcela = req.params.id;

        const parcela = await ParcelasModelo.count({
          where: { descripcion_parcela, id_parcela: { [Op.not]: id_parcela } },
        });
        console.log(parcela);
        if (parcela > 0) {
          return Promise.reject("La descripcion de parcela ingresada ya se encuentra en la bd");
        }
      },
    ),
  verificarCampos,
];

export const deleteParcelaMidd = [
  param("id").custom(
    async (id_parcela) => {
      const parcela = await ParcelasModelo.count({
        where: { id_parcela },
      });

      if (parcela === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
