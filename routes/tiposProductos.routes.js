import { Router } from "express";

import {
    getTiposProductos, 
    getTipoProductoUnico, 
    postTipoPoducto, 
    updateTipoProducto, 
    deleteTipoProducto
} from "../controllers/tiposProductos.controller.js";

import { validadorDeCampos, existeTipoProducto } from '../middlewares/tiposProductos.middleware.js'

const router = Router();

//  Ruta que devuelve todos los tipos de productos
router.get("/tipoproducto", getTiposProductos);

// Ruta que devuelve un solo tipo de porducto
router.get("/tipoproducto/:id", getTipoProductoUnico);

// Ruta que almacena nuevos tipos productos
router.post("/tipoproducto", validadorDeCampos, existeTipoProducto, postTipoPoducto);

// Ruta que actualiza los datos de un tipo de producto
router.put("/tipoproducto/:id", updateTipoProducto);

// Ruta que elimina un tipo de producto
router.delete("/tipoproducto/:id", deleteTipoProducto);

export default router;