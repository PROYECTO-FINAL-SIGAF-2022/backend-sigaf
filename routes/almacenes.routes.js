import { Router } from "express";
import {
  deleteAlmacen,
  getAlmacenes, getAlmacenUnico, postAlmacenes, putAlmacen, putVenderAlmacen,
} from "../controllers/almacenes.controller.js";
import {
  deleteAlmacenMidd,
  getAlmacenesMidd, getAlmacenMidd, postAlmacenesMidd, putAlmacenesMidd, putAlmacenesVenderMidd,
} from "../middlewares/almacenes.middlewares.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/almacenes", validateToken, validarAccesoRutas, getAlmacenesMidd, getAlmacenes);

router.get("/almacenes/:id", validateToken, validarAccesoRutas, getAlmacenMidd, getAlmacenUnico);

router.post("/almacenes", validateToken, validarAccesoRutas, postAlmacenesMidd, postAlmacenes);

router.put("/almacenes/:id", validateToken, validarAccesoRutas, putAlmacenesMidd, putAlmacen);

router.delete("/almacenes/:id", validateToken, validarAccesoRutas, deleteAlmacenMidd, deleteAlmacen);

router.put("/almacenes-vender/:id", validateToken, validarAccesoRutas, putAlmacenesVenderMidd, putVenderAlmacen);

export default router;
