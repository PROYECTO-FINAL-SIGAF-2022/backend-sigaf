import { Router } from "express";

import {
  getProveedores,
  getProveedorUnico,
  postProveedor,
  updateProveedor,
  deleteProveedor,
} from "../controllers/proveedores.controller.js";

import { validadorDeCampos } from "../middlewares/proveedores.middleware.js";

const router = Router();

//  Ruta que devuelve todos los proveedores
router.get("/proveedores", getProveedores);

// Ruta que devuelve un solo proveedor
router.get("/proveedores/:id", getProveedorUnico);

// Ruta que almacena nuevos proveedores
router.post("/proveedores", validadorDeCampos, postProveedor);

// Ruta que actualiza los datos de unproveedor
router.put("/proveedores/:id", updateProveedor);

// Ruta que elimina un proveedor
router.delete("/proveedores/:id", deleteProveedor);

export default router;
