import { Router } from "express";
import {
  getParcelasCultivos,
  getParcelaCultivoUnico,
  postParcelaCultivo,
  updateParcelaCultivo,
  deleteParcelaCultivo,
} from "../controllers/parcelasCultivos.controllers.js";

const router = Router();

router.get("/api/get-parcelas-cultivos", getParcelasCultivos);

router.get("/api/get-parcela-cultivo/:id", getParcelaCultivoUnico);

router.post("/api/post-parcela-cultivo", postParcelaCultivo);

router.put("/api/edit-parcela-cultivo/:id", updateParcelaCultivo);

router.delete("/api/delete-parcela-cultivo/:id", deleteParcelaCultivo);

export default router;
