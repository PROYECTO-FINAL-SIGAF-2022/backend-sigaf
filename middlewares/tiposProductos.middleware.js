// validar datos de los tipos de productos con express-validator

import { TiposProductosModelo } from "../models/TiposProductos.model.js";
import { check, validationResult } from "express-validator";


const validadorDeCampos = [
  check("descripcion_tipo_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("El tipo de producto es requerido"),
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

const existeTipoProducto = async (req, res, next) => {
    const { descripcion_tipo_producto } = req.body;
    const tipoProducto = await TiposProductosModelo.findOne({
      where: { descripcion_tipo_producto },
    });

    if (tipoProducto) {
      res.status(406).json({
        msg: "El tipo de producto ya existe",
      });
      return;
    }
    next();
  };

export { validadorDeCampos, existeTipoProducto };