import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { MaquinasModelo } from "../models/Maquinas.model.js";
import { MaquinasParcelasCultivosModelo } from "../models/MaquinasParcelasCultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";

export const getMaquinasParcelasCultivosMidd = [verificarCampos];

export const getMaquinaParcelaCultivoMidd = [
  param("id").custom(
    async (id_maquina_parcela_cultivo) => {
      const maquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.count({
        where: { id_maquina_parcela_cultivo },
      });

      if (maquinaParcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postMaquinaParcelaCultivoMidd = [
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
  check("id_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (id_maquina, { req }) => {
        try {
          const { id_parcela_cultivo } = req.body;
          const { id_establecimiento } = req.decoded.paramUsuario;

          const maquina = await MaquinasModelo.count({
            where: { id_maquina },
          });
          // console.log(maquina);
          if (maquina === 0) {
            return Promise.reject("El id de maquina ingresada no se encuentra en la bd");
          }

          const existMaquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.count({
            where: {
              id_maquina, id_parcela_cultivo, id_establecimiento, activo: "1",
            },
          });
          // console.log(usuario);
          if (existMaquinaParcelaCultivo > 0) {
            return Promise.reject("Ya se encuenta asignado esta maquina a una parcela y al mismo establecimiento");
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  verificarCampos,
];

export const putMaquinaParcelaCultivoMidd = [
  param("id").custom(
    async (id_maquina_parcela_cultivo) => {
      const maquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.count({
        where: { id_maquina_parcela_cultivo },
      });

      if (maquinaParcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("id_parcela_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("EL id de la parcela cultivo es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        const parcelaCultivo = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
          // console.log(parcelaCultivo);
        if (parcelaCultivo === 0) {
          return Promise.reject("No existe una parcela cultivo");
        }
      },
    ),
  check("id_maquina")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de maquina es requerida")
    .custom(
      async (id_maquina, { req }) => {
        const id_maquina_parcela_cultivo = req.params.id;
        const { id_parcela_cultivo } = req.body;
        const { id_establecimiento } = req.decoded.paramUsuario;

        const maquina = await MaquinasModelo.count({
          where: { id_maquina },
        });
        // console.log(maquina);
        if (maquina === 0) {
          return Promise.reject("El id de la maquina ingresado no se encuentra en la bd");
        }

        const existMaquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.count({
          where: {
            id_maquina,
            id_parcela_cultivo,
            id_establecimiento,
            id_maquina_parcela_cultivo: { [Op.not]: id_maquina_parcela_cultivo },
            activo: "1",
          },
        });
        // console.log(usuario);
        if (existMaquinaParcelaCultivo > 0) {
          return Promise.reject("Ya se encuenta asignado esta maquina a una misma parcela y al mismo establecimiento");
        }
      },
    ),
  verificarCampos,
];
export const deleteMaquinaParcelaCultivoMidd = [
  param("id").custom(
    async (id_maquina_parcela_cultivo) => {
      const maquinaParcelaCultivo = await MaquinasParcelasCultivosModelo.count({
        where: { id_maquina_parcela_cultivo },
      });

      if (maquinaParcelaCultivo === 0) {
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
