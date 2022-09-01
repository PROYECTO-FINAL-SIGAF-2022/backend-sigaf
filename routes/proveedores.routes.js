import { Router } from "express";

import {
  getProveedores,
  getProveedorUnico,
  postProveedor,
  updateProveedor,
  deleteProveedor,
} from "../controllers/proveedores.controller.js";

import { validadorDeCampos } from '../middlewares/proveedores.middleware.js'

const router = Router();

//  Ruta que devuelve todos los proveedores
router.get("/proveedor", getProveedores);

// Ruta que devuelve un solo proveedor
router.get("/proveedor/:id", getProveedorUnico);

// Ruta que almacena nuevos proveedores
router.post("/proveedor", validadorDeCampos, postProveedor);

// Ruta que actualiza los datos de unproveedor
router.put("/proveedor/:id", updateProveedor);

// Ruta que elimina un proveedor
router.delete("/proveedor/:id", deleteProveedor);

export default router;