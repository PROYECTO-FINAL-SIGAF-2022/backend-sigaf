import { Router } from "express";
import {
  deleteCampania,
  getCampanias,
  getCampaniaUnico,
  postCampania,
  updateCampania,
} from "../controllers/campanias.controllers.js";
import validateToken from "../middlewares/validateToken.middleware.js";

import {validadorDeCampos} from '../middlewares/campanias.middlewares.js'

const router = Router();

router.get("/campania",validateToken, getCampanias);

router.get("/campania/:id",validateToken, getCampaniaUnico);

router.post("/campania",validateToken,validadorDeCampos, postCampania);

router.put("/campania/:id",validateToken, updateCampania);

router.delete("/campania/:id",validateToken, deleteCampania);

export default router;
