import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { ActividadesModelo } from "../models/Actividades.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";
import { ProductosModelo } from "../models/Productos.model.js";
import { HistorialesParcelasCultivosModelo } from "../models/HistorialesParcelasCultivos.model.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

export const getHistorialesMidd = [verificarCampos];

export const getHistorialMidd = [
  param("id").custom(
    async (id_historial_parcelas_cultivos) => {
      const historial = await HistorialesParcelasCultivosModelo.count({
        where: { id_historial_parcelas_cultivos },
      });

      if (historial === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postHistorialMidd = [
  check("id_parcela_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de parcela cultivo es requirido")
    .custom(
      async (id_parcela_cultivo) => {
        const historial = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de parcela cultivo no se encuentra en la bd");
        }
      },
    ),
  check("id_actividad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de actividad es requerida")
    .custom(
      async (id_actividad) => {
        const historial = await ActividadesModelo.count({
          where: { id_actividad },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de actividad no se encuentra en la bd");
        }
      },
    ),
  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de usuario es requerida")
    .custom(
      async (id_usuario) => {
        const historial = await UsuariosModelo.count({
          where: { id_usuario },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de usuario no se encuentra en la bd");
        }
      },
    ),
  check("id_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de producto es requerida")
    .custom(
      async (id_producto) => {
        const historial = await ProductosModelo.count({
          where: { id_producto },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de producto no se encuentra en la bd");
        }
      },
    ),
  check("cantidad_uso_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad de uso producto es requerida"),
  check("id_establecimiento")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El establecimiento es requerida")
    .custom(
      async (id_establecimiento) => {
        const establecimiento = await EstablecimientosModelo.count({
          where: { id_establecimiento },
        });
        // console.log(establecimiento);
        if (establecimiento === 0) {
          return Promise.reject("El establecimiento no existe por favor verifique");
        }
      },
    ),

  verificarCampos,
];
export const putHistorialMidd = [
  param("id").custom(
    async (id_historial_parcelas_cultivos) => {
      const actividad = await HistorialesParcelasCultivosModelo.count({
        where: { id_historial_parcelas_cultivos },
      });

      if (actividad === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("id_parcela_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de parcela cultivo es requerida")
    .custom(
      async (id_parcela_cultivo) => {
        const historial = await ParcelasCultivosModelo.count({
          where: { id_parcela_cultivo },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de actividad no se encuentra en la bd");
        }
      },

    ),

  check("id_actividad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de actividad es requerida")
    .custom(
      async (id_actividad) => {
        const historial = await ActividadesModelo.count({
          where: { id_actividad },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de actividad no se encuentra en la bd");
        }
      },

    ),

  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de usuario es requerida")
    .custom(
      async (id_usuario) => {
        const historial = await UsuariosModelo.count({
          where: { id_usuario },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de usuario no se encuentra en la bd");
        }
      },

    ),
  check("id_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El id de producto es requerida")
    .custom(
      async (id_producto) => {
        const historial = await ProductosModelo.count({
          where: { id_producto },
        });
        // console.log(actividad);
        if (historial === 0) {
          return Promise.reject("El id de producto no se encuentra en la bd");
        }
      },

    ),
  check("cantidad_uso_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad de uso producto es requerida"),

  verificarCampos,
];
export const deleteHistorialMidd = [
  param("id").custom(
    async (id_historial_parcelas_cultivos) => {
      const actividad = await HistorialesParcelasCultivosModelo.count({
        where: { id_historial_parcelas_cultivos },
      });

      if (actividad === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
