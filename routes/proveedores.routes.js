import { Router } from "express";

import {
  getProveedores,
  getProveedorUnico,
  postProveedor,
  updateProveedor,
  deleteProveedor,
} from "../controllers/proveedores.controller.js";
import {
  deleteProveedoresMidd,
  getProveedoresMidd, getProveedorMidd, postProveedoresMidd, putProveedorMidd,
} from "../middlewares/proveedores.middleware.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los proveedores
router.get("/proveedores", validateToken, validarAccesoRutas, getProveedoresMidd, getProveedores);

// Ruta que devuelve un solo proveedor
router.get("/proveedores/:id", validateToken, validarAccesoRutas, getProveedorMidd, getProveedorUnico);

// Ruta que almacena nuevos proveedores
router.post("/proveedores", validateToken, validarAccesoRutas, postProveedoresMidd, postProveedor);

// Ruta que actualiza los datos de unproveedor
router.put("/proveedores/:id", validateToken, validarAccesoRutas, putProveedorMidd, updateProveedor);

// Ruta que elimina un proveedor
router.delete("/proveedores/:id", validateToken, validarAccesoRutas, deleteProveedoresMidd, deleteProveedor);

export default router;
