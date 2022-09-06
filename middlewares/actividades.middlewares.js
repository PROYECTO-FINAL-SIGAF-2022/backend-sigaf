import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import { ActividadesModelo } from "../models/Actividades.model.js";

const getActividadesMidd = [verificarCampos];

const getActividadMidd = [
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

const postActividadesMidd = [
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
const putActividadesMidd = [
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
const deleteActividadesMidd = [
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

export {
  getActividadesMidd,
  getActividadMidd,
  postActividadesMidd,
  putActividadesMidd,
  deleteActividadesMidd,
};

// const validadorDeCampos = [
//   check("descripcion_actividad")
//     .exists()
//     .not()
//     .isEmpty()
//     .withMessage("La actividad es requerida"),
//   (req, res, next) => {
//     try {
//       validationResult(req).throw();
//       return next();
//     } catch (error) {
//       res.status(406).json({
//         msg: "Error en los datos",
//         errores: error.mapped(),
//       });
//     }
//   },
// ];
