import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getPerdidaParcCultivosMidd = [verificarCampos];

export const getPerdidaParCultivoMidd = [
  param("id").custom(
    async (id_perdida_parcela_cultivo) => {
      const perdidaParcCult = await PerdidasParcelasCultivosModelo.count({
        where: { id_perdida_parcela_cultivo },
      });

      if (perdidaParcCult === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postPerdidaParCultivoMidd = [
  check("id_parcela_cultivo")
    .not()
    .isEmpty()
    .withMessage("El id de parcela cultivo es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        const parCult = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });

        if (parCult === 0) {
          return Promise.reject("El id ingresado de parcela cultivo no se encuentra en la bd");
        }
      },

    ),
  check("id_unidad_medida")
    .not()
    .isEmpty()
    .withMessage("El id de unidad de medida es requerida")
    .custom(
      async (id_unidad_medida) => {
        const unidadMedida = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });
        // console.log(unidadMedida);
        if (unidadMedida === 0) {
          return Promise.reject("El id ingresado de unidad de medida no se encuentra en la bd");
        }
      },
    ),
  check("cantidad_perdida")
    .not()
    .isEmpty()
    .withMessage("La cantidad de perdida es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor a cero"),
  verificarCampos,
];

export const putPerdidaParCultivoMidd = [
  param("id").custom(
    async (id_perdida_parcela_cultivo) => {
      const perdidaParcelaCultivo = await PerdidasParcelasCultivosModelo.count({
        where: { id_perdida_parcela_cultivo },
      });

      if (perdidaParcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("id_parcela_cultivo")
    .not()
    .isEmpty()
    .withMessage("El id de parcela cultivo es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        const parCult = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });

        if (parCult === 0) {
          return Promise.reject("El id ingresado de parcela cultivo no se encuentra en la bd");
        }
      },

    ),
  check("id_unidad_medida")
    .not()
    .isEmpty()
    .withMessage("El id de unidad de medida es requerida")
    .custom(
      async (id_unidad_medida) => {
        const unidadMedida = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });
        // console.log(unidadMedida);
        if (unidadMedida === 0) {
          return Promise.reject("El id ingresado de unidad de medida no se encuentra en la bd");
        }
      },
    ),
  check("cantidad_perdida")
    .not()
    .isEmpty()
    .withMessage("La cantidad de perdida es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor a cero"),
  verificarCampos,
];

export const deletePerdidaParCultivoMidd = [
  param("id").custom(
    async (id_perdida_parcela_cultivo) => {
      const perdidaParCul = await PerdidasParcelasCultivosModelo.count({
        where: { id_perdida_parcela_cultivo },
      });

      if (perdidaParCul === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },

  ),
  verificarCampos,
];
