// validar datos de los productos con express-validator
import { check, validationResult } from "express-validator";
import { ProductosModelo } from "../models/Productos.model.js";

const validadorDeCampos = [
  check("descripcion_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La descripcion del producto es requerido"),
  check("fecha_vencimiento_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La fecha de vencimiento es requerida"),
  check("cantidad_producto")
    .exists()
    .not()
    .isEmpty()
    .withMessage("La cantidad de producto es requerido"),
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

const existeProducto = async (req, res, next) => {
  const { descripcion_producto } = req.body;
  const producto = await ProductosModelo.findOne({
    where: { descripcion_producto },
  });
  if (producto) {
    res.status(406).json({
      msg: "El producto ya existe",
    });
    return;
  }
  next();
};

export { validadorDeCampos, existeProducto };
