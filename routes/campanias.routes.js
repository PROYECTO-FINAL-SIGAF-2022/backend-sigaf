import { Router } from "express";
import {
  deleteCampania,
  getCampanias,
  getCampaniaUnico,
  postCampania,
  updateCampania,
} from "../controllers/campanias.controllers.js";
import validateToken from "../middlewares/validateToken.middleware.js";

import { validadorDeCampos } from "../middlewares/campanias.middlewares.js";

const router = Router();

router.get("/campanias", validateToken, getCampanias);

router.get("/campanias/:id", validateToken, getCampaniaUnico);

router.post("/campanias", validateToken, validadorDeCampos, postCampania);

router.put("/campanias/:id", validateToken, updateCampania);

router.delete("/campanias/:id", validateToken, deleteCampania);

export default router;
