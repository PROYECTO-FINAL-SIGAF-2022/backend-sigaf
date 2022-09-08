// validar datos de las campañas con express-validator

import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";

import { DetalleCampanias } from "../models/DetalleCampanias.model.js";
import {CampaniasModelo} from "../models/Campanias.model.js"
import {UnidadesMedidasModelo} from "../models/UnidadesMedidas.model.js"

const getDetalleCampaniasMidd = [verificarCampos];

const getDetalleCampaniaMidd = [
  param("id").custom(
    async (id_detalle_campania) => {
      // console.log(id_campania);
      const detalle = await DetalleCampanias.count({
        where: { id_detalle_campania },
      });

      if (detalle === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

const postDetalleCampaniasMidd = [
  check("id_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de campania es requerida")
    .custom(
      async (id_campania) => {
        const campania = await CampaniasModelo.count({
          where: { id_campania },
        });
        // console.log(actividad);
        if (campania <= 0) {
          return Promise.reject("La campania ingresada no se encuentra en la bd");
        }
      },
    ),
  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de inicio es requerida")
    .custom(
      async (id_unidad_medida) => {
        const campania = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });
        // console.log(actividad);
        if (campania <= 0) {
          return Promise.reject("La Unidad de medida ingresada no se encuentra en la bd");
        }
      }),
  check("cantidad_cosechada")
    .exists()
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("La cantidad cosechada  es requerida"),
    verificarCampos,
  ];

const putDetalleCampaniasMidd = [
 param("id").custom(
    async (id_detalle_campania) => {
      // console.log(id_campania);
      const detalle = await DetalleCampanias.count({
        where: { id_detalle_campania },
      });

      if (detalle === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },

  ),
  check("id_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de campania es requerida")
    .custom(
      async (id_campania) => {
        const campania = await CampaniasModelo.count({
          where: { id_campania },
        });
        // console.log(actividad);
        if (campania <= 0) {
          return Promise.reject("La campania ingresada no se encuentra en la bd");
        }
      },
    ),
  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de inicio es requerida")
    .custom(
      async (id_unidad_medida) => {
        const campania = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });
        // console.log(actividad);
        if (campania <= 0) {
          return Promise.reject("La Unidad de medida ingresada no se encuentra en la bd");
        }
      }),
  check("cantidad_cosechada")
    .exists()
    .isNumeric()
    .not()
    .isEmpty()
    .withMessage("La cantidad cosechada  es requerida"),
    verificarCampos,
];
const deleteCampaniasMidd = [
  param("id").custom(
    async (id_detalle_campania) => {
      const campania = await CampaniasModelo.count({
        where: { id_detalle_campania },
      });
      // console.log(actividad);
      if (campania <= 0) {
        return Promise.reject("La campania ingresada no se encuentra en la bd");
      }
    },
  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];

export {
  getDetalleCampaniasMidd,
  getDetalleCampaniaMidd,
  postDetalleCampaniasMidd,
  putDetalleCampaniasMidd,
  deleteCampaniasMidd,
};
