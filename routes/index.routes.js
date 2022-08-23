import express from "express";

// Rutas

import authRutas from "./auth.routes.js";

import usuariosRutas from "./usuarios.routes.js";
import establecimientosRutas from "./establecimientos.routes.js";
import actividadesRutas from "./actividades.routes.js";
import campaniasRutas from "./campanias.routes.js";
import cultivoRutas from "./cultivos.routes.js";
import historialesParcelasCultivosRutas from "./historialesParcelasCultivos.routes.js";
import parcelasRutas from "./parcelas.routes.js";
import parcelasCultivosRutas from "./parcelasCultivos.routes.js";
import tiposUsuariosRutas from "./tiposUsuarios.routes.js";

const app = express();

export const rutas = () => [
  usuariosRutas,
  establecimientosRutas,
  actividadesRutas,
  campaniasRutas,
  cultivoRutas,
  historialesParcelasCultivosRutas,
  parcelasRutas,
  parcelasCultivosRutas,
  tiposUsuariosRutas,
  authRutas,
];

app.use(usuariosRutas);
app.use(establecimientosRutas);
app.use(actividadesRutas);
app.use(campaniasRutas);
app.use(cultivoRutas);
app.use(historialesParcelasCultivosRutas);
app.use(parcelasRutas);
app.use(parcelasCultivosRutas);
app.use(tiposUsuariosRutas);
