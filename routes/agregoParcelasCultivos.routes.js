import { Router } from "express";
import {
  getAggParcelasCultivos,
  getAggParcelaCultivoUnico,
  postAggParcelaCultivo,
  updateAggParcCultela,
  deleteAggParcelaCultivo,
} from "../controllers/agregoParcelasCultivos.controller";

// TODO : Faltan los middlewares

const router = Router();

router.get("/agregar-parcela-cultivos", getAggParcelasCultivos);

router.get("/agregar-parcela-cultivos/:id", getAggParcelaCultivoUnico);

router.post("/agregar-parcela-cultivos", postAggParcelaCultivo);

router.put("/agregar-parcela-cultivos/:id", updateAggParcCultela);

router.delete("/agregar-parcela-cultivos/:id", deleteAggParcelaCultivo);

export default router;
