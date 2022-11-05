import { Router } from "express";
import {
  deleteEmpleadoParcelaCultivo,
  getEmpleadoParcelaCultivoUnico, getEmpleadosParcelasCultivos, postEmpleadoParcelaCultivo, putEmpleadoParcelaCultivo,
} from "../controllers/empleadosParcelasCultivos.controller.js";
import {
  deleteEmpleadoParcelaCultivoMidd,
  getEmpleadoParcelaCultivoMidd, getEmpleadosParcelasCultivosMidd, postEmpleadoParcelaCultivoMidd, putEmpleadoParcelaCultivoMidd,
} from "../middlewares/empleadosParcelasCultivos.middlewares.js";

import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/empleados-parcelas-cultivos", validateToken, validarAccesoRutas, getEmpleadosParcelasCultivosMidd, getEmpleadosParcelasCultivos);

router.get("/empleados-parcelas-cultivos/:id", validateToken, validarAccesoRutas, getEmpleadoParcelaCultivoMidd, getEmpleadoParcelaCultivoUnico);

router.post("/empleados-parcelas-cultivos", validateToken, validarAccesoRutas, postEmpleadoParcelaCultivoMidd, postEmpleadoParcelaCultivo);

router.put("/empleados-parcelas-cultivos/:id", validateToken, validarAccesoRutas, putEmpleadoParcelaCultivoMidd, putEmpleadoParcelaCultivo);

router.delete("/empleados-parcelas-cultivos/:id", validateToken, validarAccesoRutas, deleteEmpleadoParcelaCultivoMidd, deleteEmpleadoParcelaCultivo);

// router.put("/empleados-parcelas-cultivos/:id", validateToken, validarAccesoRutas, putMaquinasVenderMidd, putVenderMaquina);

export default router;
