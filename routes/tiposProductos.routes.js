import { Router } from "express";

import {
  getTiposProductos,
  getTipoProductoUnico,
  postTipoPoducto,
  updateTipoProducto,
  deleteTipoProducto,
} from "../controllers/tiposProductos.controller.js";

import {
  getTiposProductosMidd,
  getTipoProductoMidd,
  postTipoProductoMidd,
  putTipoProductoMidd,
  deleteTipoProductoMidd,
} from "../middlewares/tiposProductos.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los tipos de productos
router.get("/tipo-productos", validateToken, validarAccesoRutas, getTiposProductosMidd, getTiposProductos);

// Ruta que devuelve un solo tipo de porducto
router.get("/tipo-productos/:id", validateToken, validarAccesoRutas, getTipoProductoMidd, getTipoProductoUnico);

// Ruta que almacena nuevos tipos productos
router.post("/tipo-productos", validateToken, validarAccesoRutas, postTipoProductoMidd, postTipoPoducto);

// Ruta que actualiza los datos de un tipo de producto
router.put("/tipo-productos/:id", validateToken, validarAccesoRutas, putTipoProductoMidd, updateTipoProducto);

// Ruta que elimina un tipo de producto
router.delete("/tipo-productos/:id", validateToken, validarAccesoRutas, deleteTipoProductoMidd, deleteTipoProducto);

export default router;
