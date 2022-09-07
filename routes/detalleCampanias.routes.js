import { Router } from "express";
import {
  getDetalleCampanias, getDetalleCampaniaUnico, postDetalleCampania, updateDetalleCampania, deleteDetalleCampania,
} from "../controllers/detalleCampanias.controller";

import validateToken from "../middlewares/validateToken.middleware";

const router = Router();

router.get("/detalle-campanias", validateToken, getDetalleCampanias);

router.get("/detalle-campanias/:id", validateToken, getDetalleCampaniaUnico);

router.post("/detalle-campanias", validateToken, postDetalleCampania);

router.put("/detalle-campanias/:id", validateToken, updateDetalleCampania);

router.delete("/detalle-campanias/:id", validateToken, deleteDetalleCampania);
