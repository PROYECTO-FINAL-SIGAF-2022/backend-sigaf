import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ActividadesModelo } from "../models/Actividades.model.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

export const getActividadesMidd = [verificarCampos];

export const getActividadMidd = [
  param("id").custom(
    async (id_actividad) => {
      const actividad = await ActividadesModelo.count({
        where: { id_actividad },
      });

      if (actividad === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  verificarCampos,
];

export const postActividadesMidd = [
  check("descripcion_actividad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La actividad es requerida")
    .custom(
      async (descripcion_actividad) => {
        const actividad = await ActividadesModelo.count({
          where: { descripcion_actividad },
        });
        // console.log(actividad);
        if (actividad > 0) {
          return Promise.reject("La actividad ingresada ya se encuentra en la bd");
        }
      },

    ),
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
export const putActividadesMidd = [
  param("id").custom(
    async (id_actividad) => {
      const actividad = await ActividadesModelo.count({
        where: { id_actividad },
      });

      if (actividad === 0) {
        return Promise.reject("El id enviado no se coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_actividad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La actividad es requerida")
    .custom(
      async (descripcion_actividad) => {
        const actividad = await ActividadesModelo.count({
          where: { descripcion_actividad },
        });
        // console.log(actividad);
        if (actividad > 0) {
          return Promise.reject("La actividad ingresada ya se encuentra en la bd");
        }
      },
    ),
  verificarCampos,
];
export const deleteActividadesMidd = [
  param("id").custom(
    async (id_actividad) => {
      const actividad = await ActividadesModelo.count({
        where: { id_actividad },
      });

      if (actividad === 0) {
        return Promise.reject();
      }
    },

  ).withMessage("El id enviado no se coincide con ningun registro de la base de datos"),
  verificarCampos,
];
