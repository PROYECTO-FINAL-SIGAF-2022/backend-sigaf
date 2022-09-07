import { Router } from "express";
import {
  deleteCultivo,
  getCultivos,
  getCultivoUnico,
  postCultivo,
  updateCultivo,
} from "../controllers/cultivos.controllers.js";

import { validadorDeCampos, existCultivo } from "../middlewares/cultivos.middlewares.js";

const router = Router();

router.get("/cultivos", getCultivos);

router.get("/cultivos/:id", getCultivoUnico);

router.post("/cultivos", validadorDeCampos, existCultivo, postCultivo);

router.put("/cultivos/:id", updateCultivo);

router.delete("/cultivos/:id", deleteCultivo);

export default router;
