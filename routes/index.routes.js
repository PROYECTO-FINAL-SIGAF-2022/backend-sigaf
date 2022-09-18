// import express from "express";

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
import detalleCampaniasRutas from "./detalleCampanias.routes.js";
import tiposProductosRutas from "./tiposProductos.routes.js";
import agregoParcelasCultivosRutas from "./agregoParcelasCultivos.routes.js";
import proveedoresRutas from "./proveedores.routes.js";
import unidadesMedidasRutas from "./unidadesMedidas.routes.js";
import productosRutas from "./productos.routes";
// const app = express();

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
  detalleCampaniasRutas,
  tiposProductosRutas,
  agregoParcelasCultivosRutas,
  proveedoresRutas,
  unidadesMedidasRutas,
  productosRutas,
];

// app.use("/api", usuariosRutas);
// app.use("/api", establecimientosRutas);
// app.use("/api", actividadesRutas);
// app.use("/api", campaniasRutas);
// app.use("/api", cultivoRutas);
// app.use("/api", historialesParcelasCultivosRutas);
// app.use("/api", parcelasRutas);
// app.use("/api", parcelasCultivosRutas);
// app.use("/api", tiposUsuariosRutas);
