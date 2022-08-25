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

router.get("/usuario/:id", getUsuarioUnico);

router.post("/usuario", postUsuario);

router.put("/usuario/:id", updateUsuario);

router.delete("/usuario/:id", deleteUsuario);

export default router;
