import { check, param } from "express-validator";
import { Op } from "sequelize";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { EmpleadosParcelasCultivosModelo } from "../models/EmpleadosParcelasCultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

export const getEmpleadosParcelasCultivosMidd = [verificarCampos];

export const getEmpleadoParcelaCultivoMidd = [
  param("id").custom(
    async (id_empleado_parcela_cultivo) => {
      const empleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.count({
        where: { id_empleado_parcela_cultivo },
      });

      if (empleadoParcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postEmpleadoParcelaCultivoMidd = [
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
  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de adquisicion es requerida")
    .custom(
      async (id_usuario, { req }) => {
        try {
          const { id_parcela_cultivo } = req.body;
          const { id_establecimiento } = req.decoded.paramUsuario;

          const usuario = await UsuariosModelo.count({
            where: { id_usuario },
          });
          // console.log(usuario);
          if (usuario === 0) {
            return Promise.reject("El id del usuario ingresado no se encuentra en la bd");
          }

          const existUsuarioParcelaCultivo = await EmpleadosParcelasCultivosModelo.count({
            where: { id_usuario, id_parcela_cultivo, id_establecimiento },
          });
          // console.log(usuario);
          if (existUsuarioParcelaCultivo > 0) {
            return Promise.reject("Ya se encuenta asignado este empleado a una parcela y al mismo establecimiento");
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  verificarCampos,
];

export const putEmpleadoParcelaCultivoMidd = [
  param("id").custom(
    async (id_empleado_parcela_cultivo) => {
      const empleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.count({
        where: { id_empleado_parcela_cultivo },
      });

      if (empleadoParcelaCultivo === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("id_parcela_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la maquina es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        // const id_empleado_parcela_cultivo = req.params.id;
        const parcelaCultivo = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
          // console.log(parcelaCultivo);
        if (parcelaCultivo === 0) {
          return Promise.reject("No existe una parcela cultivo");
        }
      },
    ),
  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de usuario es requerida")
    .custom(
      async (id_usuario, { req }) => {
        const id_empleado_parcela_cultivo = req.params.id;
        const { id_parcela_cultivo } = req.body;
        const { id_establecimiento } = req.decoded.paramUsuario;

        const usuario = await UsuariosModelo.count({
          where: { id_usuario },
        });
        // console.log(usuario);
        if (usuario === 0) {
          return Promise.reject("El id del usuario ingresado no se encuentra en la bd");
        }

        const existUsuarioParcelaCultivo = await EmpleadosParcelasCultivosModelo.count({
          where: {
            id_usuario,
            id_parcela_cultivo,
            id_establecimiento,
            id_empleado_parcela_cultivo: { [Op.not]: id_empleado_parcela_cultivo },
            activo: "1",
          },
        });
        // console.log(usuario);
        if (existUsuarioParcelaCultivo > 0) {
          return Promise.reject("Ya se encuenta asignado este empleado a una parcela y al mismo establecimiento");
        }
      },
    ),
  verificarCampos,
];
export const deleteEmpleadoParcelaCultivoMidd = [
  param("id").custom(
    async (id_empleado_parcela_cultivo) => {
      const empleadoParcelaCultivo = await EmpleadosParcelasCultivosModelo.count({
        where: { id_empleado_parcela_cultivo },
      });

      if (empleadoParcelaCultivo === 0) {
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
