import { Router } from "express";
import {
  deleteCultivo,
  getCultivos,
  getCultivoUnico,
  postCultivo,
  updateCultivo,
} from "../controllers/cultivos.controllers.js";
import {
  deleteCultivoMidd,
  getCultivoMidd, getCultivosMidd, postCultivoMidd, putCultivoMidd,
} from "../middlewares/cultivos.middlewares.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

import validateToken from "../middlewares/validateToken.middleware.js";
// import { validadorDeCampos, existCultivo } from "../middlewares/cultivos.middlewares.js";

const router = Router();

router.get("/cultivos", validateToken, validarAccesoRutas, getCultivosMidd, getCultivos);

router.get("/cultivos/:id", validateToken, validarAccesoRutas, getCultivoMidd, getCultivoUnico);

router.post("/cultivos", validateToken, validarAccesoRutas, postCultivoMidd, postCultivo);

router.put("/cultivos/:id", validateToken, validarAccesoRutas, putCultivoMidd, updateCultivo);

router.delete("/cultivos/:id", validateToken, validarAccesoRutas, deleteCultivoMidd, deleteCultivo);

export default router;
