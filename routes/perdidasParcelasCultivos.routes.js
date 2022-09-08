import { Router } from "express";
import {
  getPerdidasParcelasCultivos,
  getPerdidaParcelaCultivoUnico,
  postPerdidaParcelaCultivo,
  updatePerdidaParcelaCultivo,
  deletePerdidaParcelaCultivo,
} from "../controllers/perdidasParcelasCultivos.controller.js";

const router = Router();

router.get("/perdida-parcelas-cultivos", getPerdidasParcelasCultivos);

router.get("/perdida-parcela-cultivo/:id", getPerdidaParcelaCultivoUnico);

router.post("/perdida-parcelas-cultivos", postPerdidaParcelaCultivo);

router.put("/perdida-parcelas-cultivos/:id", updatePerdidaParcelaCultivo);

router.delete("/perdida-parcelas-cultivos/:id", deletePerdidaParcelaCultivo);

export default router;
