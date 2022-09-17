import { Router } from "express";
import {
  getTiposUsuarios,
  getTipoUsuarioUnico,
  postTipoUsuario,
  updateTipoUsuario,
  deleteTipoUsuario,
} from "../controllers/tiposUsuarios.controllers.js";
import {
  deleteTipoUsuarioMidd,
  getTiposUsuariosMidd, getTipoUsuarioMidd, postTipoUsuarioMidd, putTipoUsuarioMidd,
} from "../middlewares/tiposUsuarios.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/tipos-usuarios", validateToken, getTiposUsuariosMidd, getTiposUsuarios);

router.get("/tipos-usuarios/:id", validateToken, getTipoUsuarioMidd, getTipoUsuarioUnico);

router.post("/tipos-usuarios", validateToken, postTipoUsuarioMidd, postTipoUsuario);

router.put("/tipos-usuarios/:id", validateToken, putTipoUsuarioMidd, updateTipoUsuario);

router.delete("/tipos-usuarios/:id", validateToken, deleteTipoUsuarioMidd, deleteTipoUsuario);

export default router;
