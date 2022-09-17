import { Router } from "express";

import {
  getProductos,
  getProductoUnico,
  postPoducto,
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

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los productos
router.get("/productos", validateToken, getProductosMidd, getProductos);

// Ruta que devuelve un solo porducto
router.get("/productos/:id", validateToken, getProductoMidd, getProductoUnico);

// Ruta que almacena nuevos productos
router.post("/productos", validateToken, postProductoMidd, postPoducto);

// Ruta que actualiza los datos de un producto
router.put("/productos/:id", validateToken, putProductoMidd, updateProducto);

// Ruta que elimina un producto
router.delete("/productos/:id", validateToken, deleteCultivoMidd, deleteProducto);

export default router;
