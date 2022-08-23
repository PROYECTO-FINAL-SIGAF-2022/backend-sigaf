import { Router } from "express";
import {
  getTiposUsuarios,
  getTipoUsuarioUnico,
  postTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
} from "../controllers/tiposUsuarios.controllers.js";

const router = Router();

router.get("/api/get-tipo-user", getTiposUsuarios);

router.get("/api/get-tipo-user/:id", getTipoUsuarioUnico);

router.post("/api/post-tipo-user", postTipoUsuario);

router.put("/api/edit-tipo-user/:id", updateTipoUsuario);

router.delete("/api/delete-tipo-user/:id", deleteTipoUsuario);

export default router;
