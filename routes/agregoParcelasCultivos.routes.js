import { Router } from "express";
import {
  getAggParcelasCultivos,
  getAggParcelaCultivoUnico,
  postAggParcelaCultivo,
  updateAggParcCultela,
  deleteAggParcelaCultivo
} from "../controllers/agregoParcelasCultivos.controller";

//TODO : Faltan los middlewares

const router = Router();

router.get("/agregarParcelaCultivo", getAggParcelasCultivos);

router.get("/agregarParcelaCultivo/:id", getAggParcelaCultivoUnico);

router.post("/agregarParcelaCultivo", postAggParcelaCultivo);

router.put("/agregarParcelaCultivo/:id", updateAggParcCultela);

router.delete("/agregarParcelaCultivo/:id", deleteAggParcelaCultivo);

export default router;