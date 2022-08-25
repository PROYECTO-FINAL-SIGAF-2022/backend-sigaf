import { Router } from "express";
import {
  getParcelasCultivos,
  getParcelaCultivoUnico,
  postParcelaCultivo,
  updateParcelaCultivo,
  deleteParcelaCultivo,
} from "../controllers/parcelasCultivos.controllers.js";

const router = Router();

router.get("/parcelas-cultivos", getParcelasCultivos);

router.get("/parcela-cultivo/:id", getParcelaCultivoUnico);

router.post("/parcela-cultivo", postParcelaCultivo);

router.put("/parcela-cultivo/:id", updateParcelaCultivo);

router.delete("/parcela-cultivo/:id", deleteParcelaCultivo);

export default router;
