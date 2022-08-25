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

router.get("/tipo-usuario/:id", getTipoUsuarioUnico);

router.post("/tipo-usuario", postTipoUsuario);

router.put("/tipo-usuario/:id", updateTipoUsuario);

router.delete("/tipo-usuario/:id", deleteTipoUsuario);

export default router;
