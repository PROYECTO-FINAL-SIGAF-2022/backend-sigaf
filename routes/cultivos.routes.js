import { Router } from "express";
import {
  deleteCultivo,
  getCultivos,
  getCultivoUnico,
  postCultivo,
  updateCultivo,
} from "../controllers/cultivos.controllers.js";

const router = Router();

router.get("/cultivos", getCultivos);

router.get("/cultivo/:id", getCultivoUnico);

router.post("/cultivo", postCultivo);

router.put("/cultivo/:id", updateCultivo);

router.delete("/cultivo/:id", deleteCultivo);

export default router;
