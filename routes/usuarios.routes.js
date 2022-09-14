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
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

//  Ruta que devuelve todos los usuarios
router.get("/usuarios", validateToken, getUsuariosMidd, getUsuarios);

router.get("/usuarios/:id", validateToken, getUsuarioMidd, getUsuarioUnico);

router.post("/usuarios", validateToken, postUsuariosMidd, postUsuario);

router.put("/usuarios/:id", validateToken, updateUsuariosMidd, updateUsuario);

router.delete("/usuarios/:id", validateToken, deleteUsuariosMidd, deleteUsuario);

export default router;
