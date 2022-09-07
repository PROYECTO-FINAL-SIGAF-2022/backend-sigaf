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

import validateToken from "../middlewares/validateToken.middleware.js";
// import { validadorDeCampos, existCultivo } from "../middlewares/cultivos.middlewares.js";

const router = Router();

router.get("/cultivos", validateToken, getCultivosMidd, getCultivos);

router.get("/cultivos/:id", validateToken, getCultivoMidd, getCultivoUnico);

router.post("/cultivos", validateToken, postCultivoMidd, postCultivo);

router.put("/cultivos/:id", validateToken, putCultivoMidd, updateCultivo);

router.delete("/cultivos/:id", validateToken, deleteCultivoMidd, deleteCultivo);

export default router;
