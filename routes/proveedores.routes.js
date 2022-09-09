import { Router } from "express";

import {
  getProveedores,
  getProveedorUnico,
  postProveedor,
  updateProveedor,
  deleteProveedor,
} from "../controllers/proveedores.controller.js";

import { 
  getProveedoresMidd,
  getProveedorMidd,
  postProveedorMidd,
  putProveedorMidd,
  deleteProveedorMidd,
 } from "../middlewares/proveedores.middleware.js";
 
 import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los proveedores
router.get("/proveedores", validateToken, getProveedoresMidd, getProveedores);

// Ruta que devuelve un solo proveedor
router.get("/proveedores/:id", validateToken, getProveedorMidd, getProveedorUnico);

// Ruta que almacena nuevos proveedores
router.post("/proveedores", validateToken, postProveedorMidd, postProveedor);

// Ruta que actualiza los datos de unproveedor
router.put("/proveedores/:id", validateToken, putProveedorMidd, updateProveedor);

// Ruta que elimina un proveedor
router.delete("/proveedores/:id", validateToken, deleteProveedorMidd, deleteProveedor);

export default router;
