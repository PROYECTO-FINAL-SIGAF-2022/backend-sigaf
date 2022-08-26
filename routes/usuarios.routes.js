import { Router } from "express";

import {
  getUsuarios,
  getUsuarioUnico,
  postUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";
import { validadorDeCampos, existUser } from "../middlewares/usuarios.middlewares.js";

const router = Router();

//  Ruta que devuelve todos los usuarios
router.get("/usuarios", getUsuarios);

router.get("/usuarios/:id", getUsuarioUnico);

router.post("/usuarios", validadorDeCampos, existUser, postUsuario);

router.put("/usuarios/:id", updateUsuario);

router.delete("/usuarios/:id", deleteUsuario);

export default router;
