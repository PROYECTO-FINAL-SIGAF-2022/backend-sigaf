import { Router } from "express";
import {
  getParcelasCultivos,
  getParcelaCultivoUnico,
  postParcelaCultivo,
  updateParcelaCultivo,
  deleteParcelaCultivo,
} from "../controllers/parcelasCultivos.controllers.js";
import {
  getParcelaCultivoMidd, getParcelaCultivosMidd, postParcelaCultivosMidd, updateParcelaCultivosMidd, deleteParcelaCultivosMidd,
} from "../middlewares/parcelasCultivos.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/parcelas-cultivos", validateToken, getParcelaCultivosMidd, getParcelasCultivos);

router.get("/parcelas-cultivos/:id", validateToken, getParcelaCultivoMidd, getParcelaCultivoUnico);

router.post("/parcelas-cultivos", validateToken, postParcelaCultivosMidd, postParcelaCultivo);

router.put("/parcelas-cultivos/:id", validateToken, updateParcelaCultivosMidd, updateParcelaCultivo);

router.delete("/parcelas-cultivos/:id", validateToken, deleteParcelaCultivosMidd, deleteParcelaCultivo);

export default router;
