import { check, param } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";

export const getActividadesMidd = [verificarCampos];
