import { Router } from "express";
import {
  deleteMaquinaParcelaCultivo,
  getMaquinaParcelaCultivoUnico, getMaquinasParcelasCultivos, postMaquinaParcelaCultivo, putMaquinaParcelaCultivo,
} from "../controllers/maquinasParcelasCultivos.controller.js";
import {
  deleteMaquinaParcelaCultivoMidd,
  getMaquinaParcelaCultivoMidd, getMaquinasParcelasCultivosMidd, postMaquinaParcelaCultivoMidd, putMaquinaParcelaCultivoMidd,
} from "../middlewares/maquinasParcelasCultivos.middlewares.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/maquinas-parcelas-cultivos", validateToken, validarAccesoRutas, getMaquinasParcelasCultivosMidd, getMaquinasParcelasCultivos);

router.get("/maquinas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, getMaquinaParcelaCultivoMidd, getMaquinaParcelaCultivoUnico);

router.post("/maquinas-parcelas-cultivos", validateToken, validarAccesoRutas, postMaquinaParcelaCultivoMidd, postMaquinaParcelaCultivo);

router.put("/maquinas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, putMaquinaParcelaCultivoMidd, putMaquinaParcelaCultivo);

router.delete("/maquinas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, deleteMaquinaParcelaCultivoMidd, deleteMaquinaParcelaCultivo);

// router.put("/maquinas-parcelas-cultivos/:id", validateToken, validarAccesoRutas, putMaquinasVenderMidd, putVenderMaquina);

export default router;
