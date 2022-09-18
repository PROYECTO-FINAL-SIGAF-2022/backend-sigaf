import { Router } from "express";

import {
  getProductos,
  getProductoUnico,
  postProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productos.controller.js";

import {
  getProductosMidd,
  getProductoMidd,
  postProductoMidd,
  putProductoMidd,
  deleteCultivoMidd,
} from "../middlewares/productos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los productos
router.get("/productos", validateToken, validarAccesoRutas, getProductosMidd, getProductos);

// Ruta que devuelve un solo porducto
router.get("/productos/:id", validateToken, validarAccesoRutas, getProductoMidd, getProductoUnico);

// Ruta que almacena nuevos productos
router.post("/productos", validateToken, validarAccesoRutas, postProductoMidd, postProducto);

// Ruta que actualiza los datos de un producto
router.put("/productos/:id", validateToken, validarAccesoRutas, putProductoMidd, updateProducto);

// Ruta que elimina un producto
router.delete("/productos/:id", validateToken, validarAccesoRutas, deleteCultivoMidd, deleteProducto);

export default router;
