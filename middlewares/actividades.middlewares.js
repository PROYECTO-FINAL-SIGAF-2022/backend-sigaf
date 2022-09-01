// validar datos de usuario con express-validator

import { check, validationResult } from "express-validator";


const validadorDeCampos = [
  check("descripcion_actividad")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La actividad es requerida"),
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