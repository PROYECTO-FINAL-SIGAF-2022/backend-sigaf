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
import { validarAccesoRutas } from "../middlewares/validarAccesoRutas.middleware.js";
import validateToken from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/tipos-usuarios", validateToken, validarAccesoRutas, getTiposUsuariosMidd, getTiposUsuarios);

router.get("/tipos-usuarios/:id", validateToken, validarAccesoRutas, getTipoUsuarioMidd, getTipoUsuarioUnico);

router.post("/tipos-usuarios", validateToken, validarAccesoRutas, postTipoUsuarioMidd, postTipoUsuario);

router.put("/tipos-usuarios/:id", validateToken, validarAccesoRutas, putTipoUsuarioMidd, updateTipoUsuario);

router.delete("/tipos-usuarios/:id", validateToken, validarAccesoRutas, deleteTipoUsuarioMidd, deleteTipoUsuario);

export default router;
