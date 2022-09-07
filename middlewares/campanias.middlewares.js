// validar datos de las campañas con express-validator

import { check, validationResult, param } from "express-validator";

import { CampaniasModelo } from "../models/Campanias.model.js";

const validadorDeCampos = [
  param("id").custom(
    async (id_campania) => {
      const campania = await CampaniasModelo.count({
        where: { id_campania },
      });

      if (campania == 0) {
        return Promise.reject("El id enviado no coincide con ningun registro de la base de datos");
      }
    },
  ),
  check("descripcion_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La campaña es requerida")
    .custom(
      async (descripcion_campania) => {
        const campania = await CampaniasModelo.count({
          where: { descripcion_campania },
        });

        if (campania == 0) {
          return Promise.reject("La actividad ingresada ya se encuentra en la bd");
        }
      },

    ),
  check("fecha_inicio")
    .exists()
    .not()
    .isEmpty()
    // ! Falta Validar  fecha
    .withMessage("La fecha inicial no es valida"),

  check("descripcion_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la campaña es requerida"),

  check("fecha_final")
    .exists()
    .not()
    .isEmpty()
    // ! Falta Validar fecha
    .withMessage("La fecha final no es valida"),
  check("id_cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("el cultivo es requerido"),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(406).json({
        msg: "Error en los datos",
        errores: error.mapped(),
      });
    }
  },
];

export { validadorDeCampos };
