import { Router } from "express";
import {
  getTiposUsuarios,
  getTipoUsuarioUnico,
  postTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
} from "../controllers/tiposUsuarios.controllers.js";

const router = Router();

router.get("/tipos-usuarios", getTiposUsuarios);

router.get("/tipo-usuarios/:id", getTipoUsuarioUnico);

router.post("/tipo-usuarios", postTipoUsuario);

router.put("/tipo-usuarios/:id", updateTipoUsuario);

router.delete("/tipo-usuarios/:id", deleteTipoUsuario);

export default router;
