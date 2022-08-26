import { Router } from "express";

import {
  getUsuarios,
  getUsuarioUnico,
  postUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

//  Ruta que devuelve todos los usuarios
router.get("/usuarios", getUsuarios);

router.get("/usuarios/:id", getUsuarioUnico);

router.post("/usuarios", postUsuario);

router.put("/usuarios/:id", updateUsuario);

router.delete("/usuarios/:id", deleteUsuario);

export default router;
