import express from 'express';

const app = express();

//Rutas
import usuariosRutas from '../routes/usuarios.routes.js';
import establecimientosRutas from '../routes/establecimientos.routes.js';
import actividadesRutas from '../routes/actividades.routes.js';
import campaniasRutas from '../routes/campanias.routes.js';
import cultivoRutas from './cultivos.routes.js';
import historialesParcelasCultivosRutas from './historialesParcelasCultivos.routes.js';
import parcelasRutas from './parcelas.routes.js';
import parcelasCultivosRutas from './parcelasCultivos.routes.js';
import tiposUsuariosRutas from './tiposUsuarios.routes.js';

export const rutas = function () {
  return [
    usuariosRutas,
    establecimientosRutas,
    actividadesRutas,
    campaniasRutas,
    cultivoRutas,
    historialesParcelasCultivosRutas,
    parcelasRutas,
    parcelasCultivosRutas,
    tiposUsuariosRutas,
  ];
};
// app.use(usuariosRutas);
// app.use(establecimientosRutas);
// app.use(actividadesRutas);
// app.use(campaniasRutas);
// app.use(cultivoRutas);
// app.use(historialesParcelasCultivosRutas);
// app.use(parcelasRutas);
// app.use(parcelasCultivosRutas);
// app.use(tiposUsuariosRutas);
