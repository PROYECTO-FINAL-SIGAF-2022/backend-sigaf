import { Router } from "express";
import {
  deleteEstablecimiento,
  getEstablecimientos,
  getEstablecimientoUnico,
  postEstablecimiento,
  updateEstablecimiento,
} from "../controllers/establecimiento.controllers.js";

const router = Router();

router.get("/establecimientos", getEstablecimientos);

router.get("/establecimiento/:id", getEstablecimientoUnico);

router.post("/establecimiento", postEstablecimiento);

router.put("/establecimiento/:id", updateEstablecimiento);

router.delete("/establecimiento/:id", deleteEstablecimiento);

export default router;
