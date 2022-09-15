// validar datos del proveedor con express-validator

import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getUnidadesMedidasMidd = [verificarCampos];

export const getUnidadMedidaMidd = [
  param("id").custom(
    async (id_unidad_medida) => {
      const unidadMedida = await UnidadesMedidasModelo.count({
        where: { id_unidad_medida },
      });

      if (unidadMedida === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postUnidadMedidaMidd = [
  check("descripcion_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la unidad de medida es requerida")
    .custom(
      async (descripcion_unidad_medida) => {
        const unidadMedida = await UnidadesMedidasModelo.count({
          where: { descripcion_unidad_medida },
        });
        // console.log(actividad);
        if (unidadMedida > 0) {
          return Promise.reject("La unidad de medida ingresada ya se encuentra en la bd");
        }
      },

    ),
  verificarCampos,
];

export const putUnidadMedidaMidd = [
  param("id").custom(
    async (id_unidad_medida) => {
      const unidadMedida = await UnidadesMedidasModelo.count({
        where: { id_unidad_medida },
      });

      if (unidadMedida === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la unidad de medida es requerida")
    .custom(
      async (descripcion_unidad_medida, { req }) => {
        try {
          const id_unidad_medida = req.params.id;
          const unidadMedida = await UnidadesMedidasModelo.count({
            where: { descripcion_unidad_medida, id_unidad_medida: { [Op.not]: id_unidad_medida } },
          });

          if (unidadMedida > 0) {
            return Promise.reject("La descripcion de la unidad de medida ingresado ya se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
    ),
  verificarCampos,
];

export const deleteUnidadMedidaMidd = [
  param("id").custom(
    async (id_unidad_medida) => {
      const unidadMedida = await UnidadesMedidasModelo.count({
        where: { id_unidad_medida },
      });

      if (unidadMedida === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
