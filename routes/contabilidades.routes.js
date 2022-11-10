import { Router } from "express";
import {
  deleteContabilidad,
  getContabilidad, getContabilidadCampania, getContabilidadUnico, postContabilidad, putContabilidad,
} from "../controllers/contabilidades.controller.js";
import {
  deleteContabilidadMidd,
  getContabilidadCampaniaMidd,
  getContabilidadesMidd, getContabilidadMidd, postContabilidadMidd, putContabilidadMidd,
} from "../middlewares/contabilidades.middlewares.js";

import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/contabilidad", validateToken, validarAccesoRutas, getContabilidadesMidd, getContabilidad);

router.get("/contabilidad/:id", validateToken, validarAccesoRutas, getContabilidadMidd, getContabilidadUnico);

router.post("/contabilidad", validateToken, validarAccesoRutas, postContabilidadMidd, postContabilidad);

router.put("/contabilidad/:id", validateToken, validarAccesoRutas, putContabilidadMidd, putContabilidad);

router.delete("/contabilidad/:id", validateToken, validarAccesoRutas, deleteContabilidadMidd, deleteContabilidad);

// INGRESOS

router.get("/contabilidad-ingresos/:idCampania", validateToken, validarAccesoRutas, getContabilidadCampaniaMidd, getContabilidadCampania);
// router.put("/contabilidad/:id", validateToken, validarAccesoRutas, putMaquinasVenderMidd, putVenderMaquina);

export default router;
