import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { AgregoParcelasCultivosModelo } from "../models/AgregoParcelasCultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getAgregoParcCultivosMidd = [verificarCampos];

export const getAgregoParCultivoMidd = [
  param("id").custom(
    async (id_agrego_parcela_cultivo) => {
      const agregoParcCult = await AgregoParcelasCultivosModelo.count({
        where: { id_agrego_parcela_cultivo },
      });

      if (agregoParcCult === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postAgregoParCultivoMidd = [
  check("id_parcela_cultivo")
    .custom(
      async (id_parcela_cultivo) => {
        const parCult = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });

        if (parCult <= 0) {
          return Promise.reject("El id ingresado de parcela cultivo no se encuentra en la bd");
        }
      },

    )
    .not()
    .isEmpty(),
  check("id_unidad_medida")
    .custom(
      async (id_unidad_medida) => {
        const uniMedida = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });
        if (uniMedida <= 0) {
          return Promise.reject("El id ingresado de unidad de medida no se encuentra en la bd");
        }
      },

    )
    .not()
    .isEmpty(),
  check("cantidad_agregada")
    .not()
    .isEmpty()
    .withMessage("La cantidad es requerida"),

  verificarCampos,
];

export const putAgregoParCultivoMidd = [
  param("id").custom(
    async (id_agrego_parcela_cultivo) => {
      const agregoParCult = await AgregoParcelasCultivosModelo.count({
        where: { id_agrego_parcela_cultivo },
      });

      if (agregoParCult === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("id_parcela_cultivo")
    .custom(
      async (id_parcela_cultivo) => {
        const parCult = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
        if (parCult === 0) {
          return Promise.reject("El id ingresado de parcela cultivo no se encuentra en la bd");
        }
      },

    )
    .not()
    .isEmpty(),
  check("id_unidad_medida")
    .custom(
      async (id_unidad_medida) => {
        const uniMedida = await UnidadesMedidasModelo.count({
          where: { id_unidad_medida },
        });
        if (uniMedida === 0) {
          return Promise.reject("El id ingresado de unidad de medida no se encuentra en la bd");
        }
      },

    )
    .not()
    .isEmpty(),
  check("cantidad_agregada")
    .not()
    .isEmpty()
    .withMessage("La cantidad es requerida"),

  verificarCampos,
];

export const deleteAgregoParCultivoMidd = [
  param("id").custom(
    async (id_agrego_parcela_cultivo) => {
      const agregoParCul = await AgregoParcelasCultivosModelo.count({
        where: { id_agrego_parcela_cultivo },
      });

      if (agregoParCul === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },

  ),
  verificarCampos,
];
