import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { CosechasModelo } from "../models/Cosechas.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";

export const getCosechasMidd = [verificarCampos];

export const getCosechaMidd = [
  param("id").custom(
    async (id_cosecha) => {
      const cosecha = await CosechasModelo.count({
        where: { id_cosecha },
      });

      if (cosecha === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const getCosechaCampaniaParcelasMidd = [
  param("idCampania").custom(
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

export const postCosechaMidd = [
  check("cantidad_total_vendida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad total vendida es requerida"),
  check("precio_venta")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio total es requerida"),
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
  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (id_unidad_medida) => {
        try {
          const unidadMedida = await UnidadesMedidasModelo.count({
            where: { id_unidad_medida },
          });
          // console.log(unidadMedida);
          if (unidadMedida === 0) {
            return Promise.reject("El id de unidad medida ingresada no se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  verificarCampos,
];

export const putCosechaMidd = [
  param("id").custom(
    async (id_cosecha) => {
      const cosecha = await CosechasModelo.count({
        where: { id_cosecha },
      });

      if (cosecha === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("cantidad_total_vendida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad total vendida es requerida"),
  check("precio_venta")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El precio total es requerida"),
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
  check("id_unidad_medida")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (id_unidad_medida) => {
        try {
          const unidadMedida = await UnidadesMedidasModelo.count({
            where: { id_unidad_medida },
          });
          // console.log(unidadMedida);
          if (unidadMedida === 0) {
            return Promise.reject("El id de unidad medida ingresada no se encuentra en la bd");
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  verificarCampos,
];
export const deleteCosechaMidd = [
  param("id").custom(
    async (id_cosecha) => {
      const cosecha = await CosechasModelo.count({
        where: { id_cosecha },
      });

      if (cosecha === 0) {
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
