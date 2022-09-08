import { Router } from "express";

import {
  getTiposProductos,
  getTipoProductoUnico,
  postTipoPoducto,
  updateTipoProducto,
  deleteTipoProducto,
} from "../controllers/tiposProductos.controller.js";

import { validadorDeCampos, existeTipoProducto } from "../middlewares/tiposProductos.middleware.js";

const router = Router();

//  Ruta que devuelve todos los tipos de productos
router.get("/tipo-productos", getTiposProductos);

// Ruta que devuelve un solo tipo de porducto
router.get("/tipo-productos/:id", getTipoProductoUnico);

// Ruta que almacena nuevos tipos productos
router.post("/tipo-productos", validadorDeCampos, existeTipoProducto, postTipoPoducto);

// Ruta que actualiza los datos de un tipo de producto
router.put("/tipo-productos/:id", updateTipoProducto);

// Ruta que elimina un tipo de producto
router.delete("/tipo-productos/:id", deleteTipoProducto);

export default router;
