// validar datos de los cultivos con express-validator

import { check, validationResult } from "express-validator";

import { CultivosModelo } from "../models/Cultivos.model.js";

const validadorDeCampos = [
  check("cultivo")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El cultivo es requerido"),
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

const existCultivo = async (req, res, next) => {
  const { cultivo } = req.body;
  const cult = await CultivosModelo.findOne({
    where: { cultivo },
  });
  if (cult) {
    res.status(406).json({
      msg: "El cultivo ya existe",
    });
    return;
  }
  next();
};

export { validadorDeCampos, existCultivo };
