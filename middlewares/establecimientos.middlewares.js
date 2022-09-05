// validar datos de los establecimientos con express-validator
import { check, validationResult } from "express-validator";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

const validadorDeCampos = [
  check("descripcion_establecimiento")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del establecimiento es requerido"),
  check("georeferencia")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La georeferencia es requerida"),
  check("superficie")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La superficie es requerida"),
  check("id_usuario")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El usuario es requerido"),

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

const existEstablecimiento = async (req, res, next) => {
  const { descripcion_establecimiento } = req.body;
  const establecimiento = await EstablecimientosModelo.findOne({
    where: { descripcion_establecimiento },
  });
  if (establecimiento) {
    res.status(406).json({
      msg: "El establecimiento ya existe",
    });
    return;
  }
  next();
};

export { validadorDeCampos, existEstablecimiento };
