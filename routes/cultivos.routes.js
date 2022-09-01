import { Router } from "express";
import {
  deleteCultivo,
  getCultivos,
  getCultivoUnico,
  postCultivo,
  updateCultivo,
} from "../controllers/cultivos.controllers.js";

import { validadorDeCampos, existCultivo } from '../middlewares/cultivos.middlewares.js'

const router = Router();

router.get("/cultivo", getCultivos);

router.get("/cultivo/:id", getCultivoUnico);

router.post("/cultivo", validadorDeCampos, existCultivo, postCultivo);

router.put("/cultivo/:id", updateCultivo);

router.delete("/cultivo/:id", deleteCultivo);

export default router;
