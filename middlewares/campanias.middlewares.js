// validar datos de las campañas con express-validator

import { check, validationResult } from "express-validator";

const validadorDeCampos = [
  check("descripcion_campania")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion de la campaña es requerida"),
  check("fecha_inicio")
    .exists()
    .not()
    .isEmpty()
    // ! Falta Validar  fecha
    .withMessage("La fecha inicial no es valida"),
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
