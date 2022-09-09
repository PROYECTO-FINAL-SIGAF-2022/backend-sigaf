import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

const API = supertest(app);
const URL = "/api/parcelas";

const HEADERS = getTokenTest();

beforeAll(async () => {
  await vaciarTablas();

  await TiposUsuariosModelo.create({ descripcion_tipo_usuario: "Administrador" });
  await UsuariosModelo.create(usuariosIniciales.usuarios1);

  await EstablecimientosModelo.create({
    descripcion_establecimiento: "Establecimiento 1",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  });

  await ParcelasModelo.create({
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]]]]",
    superficie: "30",
    id_establecimiento: 1,
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API, {}, true);

  testFunctionGet(URL, "Debe retornar un json con los registros de parcelas", 200, API, HEADERS, true);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS, true);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
