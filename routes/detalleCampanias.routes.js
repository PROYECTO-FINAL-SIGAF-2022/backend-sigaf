import { Router } from "express";
import {
  getDetalleCampanias, getDetalleCampaniaUnico, postDetalleCampania, updateDetalleCampania, deleteDetalleCampania,
} from "../controllers/detalleCampanias.controller.js";

import { getDetalleCampaniasMidd,
  getDetalleCampaniaMidd,
  postDetalleCampaniasMidd,
  putDetalleCampaniasMidd,
  deleteCampaniasMidd} from "../middlewares/detalleCampanias.middleware.js"

import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/detalle-campanias", validateToken,getDetalleCampaniasMidd, getDetalleCampanias);

router.get("/detalle-campanias/:id", validateToken,getDetalleCampaniaMidd, getDetalleCampaniaUnico);

router.post("/detalle-campanias", validateToken,postDetalleCampaniasMidd, postDetalleCampania);

router.put("/detalle-campanias/:id", validateToken,putDetalleCampaniasMidd, updateDetalleCampania);

router.delete("/detalle-campanias/:id", validateToken,deleteCampaniasMidd, deleteDetalleCampania);


export default router;