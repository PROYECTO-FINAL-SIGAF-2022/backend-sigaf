import { Router } from "express";
import {
  deleteCampania,
  getCampanias,
  getCampaniaUnico,
  postCampania,
  updateCampania,
} from "../controllers/campanias.controllers.js";

import {validadorDeCampos} from '../middlewares/campanias.middlewares.js'
//TODO Falta arreglar el middlewares
const router = Router();

router.get("/campania", getCampanias);

router.get("/campania/:id", getCampaniaUnico);

router.post("/campania", postCampania);

router.put("/campania/:id", updateCampania);

router.delete("/campania/:id", deleteCampania);

export default router;
