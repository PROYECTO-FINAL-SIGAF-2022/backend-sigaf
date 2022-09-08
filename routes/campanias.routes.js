import { Router } from "express";
import {
  deleteCampania,
  getCampanias,
  getCampaniaUnico,
  postCampania,
  updateCampania,
} from "../controllers/campanias.controllers.js";
import validateToken from "../middlewares/validateToken.middleware.js";

import {
  getCampaniasMidd,
  getCampaniaMidd,
  postCampaniasMidd,
  putCampaniasMidd,
  deleteCampaniasMidd,
} from "../middlewares/campanias.middlewares.js";

const router = Router();

router.get("/campanias", validateToken, getCampaniasMidd, getCampanias);

router.get("/campanias/:id", validateToken, getCampaniaMidd, getCampaniaUnico);

router.post("/campanias", validateToken, postCampaniasMidd, postCampania);

router.put("/campanias/:id", validateToken, putCampaniasMidd, updateCampania);

router.delete("/campanias/:id", validateToken, deleteCampaniasMidd, deleteCampania);

export default router;
