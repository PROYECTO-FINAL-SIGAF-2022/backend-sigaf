import { Router } from "express";
import {
  deleteEstablecimiento, getEstablecimientos, getEstablecimientoUnico, postEstablecimiento, updateEstablecimiento,
} from "../controllers/establecimiento.controllers.js";

const router = Router();

router.get("/api/get-establecimiento", getEstablecimientos);

router.get("/api/get-establecimiento/:id", getEstablecimientoUnico);

router.post("/api/post-establecimiento", postEstablecimiento);

router.put("/api/edit-establecimiento/:id", updateEstablecimiento);

router.delete("/api/delete-establecimiento/:id", deleteEstablecimiento);

export default router;
