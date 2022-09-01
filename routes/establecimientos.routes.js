import { Router } from "express";
import {
  deleteEstablecimiento,
  getEstablecimientos,
  getEstablecimientoUnico,
  postEstablecimiento,
  updateEstablecimiento,
} from "../controllers/establecimiento.controllers.js";

import { validadorDeCampos, existEstablecimiento } from "../middlewares/establecimientos.middlewares.js";

const router = Router();

router.get("/establecimiento", getEstablecimientos);

router.get("/establecimiento/:id", getEstablecimientoUnico);

router.post("/establecimiento",validadorDeCampos, existEstablecimiento, postEstablecimiento);

router.put("/establecimiento/:id", updateEstablecimiento);

router.delete("/establecimiento/:id", deleteEstablecimiento);

export default router;
