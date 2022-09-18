import { Router } from "express";

import {
  getUsuarios,
  getUsuarioUnico,
  postUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";
import {
  deleteUsuariosMidd, getUsuarioMidd, getUsuariosMidd, postUsuariosMidd, updateUsuariosMidd,
} from "../middlewares/usuarios.middlewares.js";
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los usuarios
router.get("/usuarios", validateToken, validarAccesoRutas, getUsuariosMidd, getUsuarios);

router.get("/usuarios/:id", validateToken, validarAccesoRutas, getUsuarioMidd, getUsuarioUnico);

router.post("/usuarios", validateToken, validarAccesoRutas, postUsuariosMidd, postUsuario);

router.put("/usuarios/:id", validateToken, validarAccesoRutas, updateUsuariosMidd, updateUsuario);

router.delete("/usuarios/:id", validateToken, validarAccesoRutas, deleteUsuariosMidd, deleteUsuario);

export default router;
