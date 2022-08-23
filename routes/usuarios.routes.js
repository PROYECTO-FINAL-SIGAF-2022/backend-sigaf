import { Router } from "express";

import {
  getUsuarios, getUsuarioUnico, postUsuario, updateUsuario, deleteUsuario,
} from "../controllers/usuarios.controllers.js";

const router = Router();

//  Ruta que devuelve todos los usuarios
router.get("/api/get-user", getUsuarios);

router.get("/api/get-user/:id", getUsuarioUnico);

router.post("/api/post-user", postUsuario);

router.put("/api/edit-user/:id", updateUsuario);

router.delete("/api/delete-user/:id", deleteUsuario);

export default router;
