import { Router } from "express";

import {
  getProductos,
  getProductoUnico,
  postPoducto,
  updateProducto,
  deleteProducto
} from "../controllers/productos.controller.js";

import { validadorDeCampos, existeProducto } from "../middlewares/productos.middleware.js";


const router = Router();

//  Ruta que devuelve todos los productos
router.get("/productos", getProductos);

// Ruta que devuelve un solo porducto
router.get("/productos/:id", getProductoUnico);

// Ruta que almacena nuevos productos
router.post("/productos", validadorDeCampos, existeProducto,  postPoducto);

// Ruta que actualiza los datos de un producto
router.put("/productos/:id", updateProducto);

// Ruta que elimina un producto
router.delete("/productos/:id", deleteProducto);

export default router;