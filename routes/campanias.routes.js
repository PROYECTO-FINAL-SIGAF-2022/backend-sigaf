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
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";

const router = Router();

router.get("/campanias", validateToken, validarAccesoRutas, getCampaniasMidd, getCampanias);

router.get("/campanias/:id", validateToken, validarAccesoRutas, getCampaniaMidd, getCampaniaUnico);

router.post("/campanias", validateToken, validarAccesoRutas, postCampaniasMidd, postCampania);

router.put("/campanias/:id", validateToken, validarAccesoRutas, putCampaniasMidd, updateCampania);

router.delete("/campanias/:id", validateToken, validarAccesoRutas, deleteCampaniasMidd, deleteCampania);

export default router;
