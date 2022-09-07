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

router.get("/establecimientos", getEstablecimientos);

router.get("/establecimientos/:id", getEstablecimientoUnico);

router.post("/establecimientos", validadorDeCampos, existEstablecimiento, postEstablecimiento);

router.put("/establecimientos/:id", updateEstablecimiento);

router.delete("/establecimientos/:id", deleteEstablecimiento);

export default router;
