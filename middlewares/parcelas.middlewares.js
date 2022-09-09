import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
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
  check("id_establecimiento")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del establecimient es requerido")
    .custom(
      async (id_establecimiento) => {
        const establecimiento = await EstablecimientosModelo.count({
          where: { id_establecimiento },
        });

        if (establecimiento === 0) {
          return Promise.reject("El id del establecimiento enviado no existe en la bd");
        }
      },
    ),
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
  check("id_establecimiento")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id del establecimient es requerido")
    .custom(
      async (id_establecimiento) => {
        const establecimiento = await EstablecimientosModelo.count({
          where: { id_establecimiento },
        });

        if (establecimiento === 0) {
          return Promise.reject("El id del establecimiento enviado no existe en la bd");
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
