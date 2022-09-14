// validar datos de las campañas con express-validator

import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";

import { CampaniasModelo } from "../models/Campanias.model.js";

const getCampaniasMidd = [verificarCampos];

const getCampaniaMidd = [
  param("id").custom(
    async (id_campania) => {
      const campania = await CampaniasModelo.count({
        where: { id_campania },
      });

      if (campania === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

const postCampaniasMidd = [
  check("descripcion_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La Campania es requerida")
    .custom(
      async (descripcion_campania) => {
        const actividad = await CampaniasModelo.count({
          where: { descripcion_campania },
        });
        if (actividad > 0) {
          return Promise.reject("La actividad ingresada ya se encuentra en la bd");
        }
      },
    ),
  check("fecha_inicio")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de inicio es requerida"),
  check("fecha_final")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha final  es requerida"),
  check("id_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id  de cultivo es requerida"),

  verificarCampos,
];
const putCampaniasMidd = [
  param("id").custom(
    async (id_campania) => {
      const campania = await CampaniasModelo.count({
        where: { id_campania },
      });

      if (campania === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La campania es requerida")
    .custom(
      async (descripcion_campania) => {
        const campania = await CampaniasModelo.count({
          where: { descripcion_campania },
        });
        if (campania > 0) {
          return Promise.reject("La campania ingresada ya se encuentra en la bd");
        }
      },

    ),
  check("fecha_inicio")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de inicio es requerida"),
  check("fecha_final")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha final  es requerida"),
  check("id_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id  de cultivo es requerida"),

  verificarCampos,
];
const deleteCampaniasMidd = [
  param("id").custom(
    async (id_campania) => {
      const campania = await CampaniasModelo.count({
        where: { id_campania },
      });

      if (campania === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];

export {
  getCampaniasMidd,
  getCampaniaMidd,
  postCampaniasMidd,
  putCampaniasMidd,
  deleteCampaniasMidd,
};
