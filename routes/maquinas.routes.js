import { Router } from "express";
import {
  deleteMaquina,
  deleteMaquinasVendidas,
  getMaquinas, getMaquinasVendidas, getMaquinaUnico, postMaquina, putMaquina, putVenderMaquina,
} from "../controllers/maquinas.controller.js";
import {
  deleteMaquinaMidd,
  getMaquinaMidd, getMaquinasMidd, postMaquinaMidd, putMaquinasMidd, putMaquinasVenderMidd,
} from "../middlewares/maquinas.middlewares.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/maquinas", validateToken, validarAccesoRutas, getMaquinasMidd, getMaquinas);

router.get("/maquinas/:id", validateToken, validarAccesoRutas, getMaquinaMidd, getMaquinaUnico);

router.post("/maquinas", validateToken, validarAccesoRutas, postMaquinaMidd, postMaquina);

router.put("/maquinas/:id", validateToken, validarAccesoRutas, putMaquinasMidd, putMaquina);

router.delete("/maquinas/:id", validateToken, validarAccesoRutas, deleteMaquinaMidd, deleteMaquina);

router.put("/maquinas-vender/:id", validateToken, validarAccesoRutas, putMaquinasVenderMidd, putVenderMaquina);

router.get("/maquinas-vendidas", validateToken, validarAccesoRutas, getMaquinasVendidas);
router.delete("/maquinas-vendidas/:fecha", validateToken, validarAccesoRutas, deleteMaquinasVendidas);

export default router;
