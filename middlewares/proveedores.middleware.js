// validar datos del proveedor con express-validator

import { check, validationResult } from "express-validator";

const validadorDeCampos = [
  check("nombre_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El nombre del proveedor es requerido"),
  check("telefono_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El telefono es requerido"),
  check("direccion_proveedor")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La direccion del proveedor es requerido"),
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
