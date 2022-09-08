import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { ActividadesModelo } from "../models/Actividades.model.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";

const API = supertest(app);
const URL = "/api/actividades";

const HEADERS = getTokenTest();

beforeAll(async () => {
  await vaciarTablas();
  await ActividadesModelo.create({ descripcion_actividad: "Cultivar" });
  await ActividadesModelo.create({ descripcion_actividad: "Regar" });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de actividades", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  testFunctionPost(URL, "Debe retornar un error al no enviar el token", {
    descripcion_actividad: "Plantar",
  }, 401, API);

  testFunctionPost(URL, "Crear una actividad", {
    descripcion_actividad: "Plantar",
  }, 201, API, HEADERS);

  testFunctionPost(URL, "Crear una actividad", {
    descripcion_actividad: "Plantar",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear una actividad", {
    descripcion_actividad: "",
  }, 400, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    descripcion_actividad: "Plantar",
  }, 401, API);

  testFunctionPut(`${URL}/1`, "Actualizar una actividad", {
    descripcion_actividad: "sembrarrr",
  }, 200, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar una actividad con un id inexistente", {
    descripcion_actividad: "sembrarrr",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar una actividad con una descripcion ya existente", {
    descripcion_actividad: "Cultivar",
  }, 400, API, HEADERS);
});
describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar una actividad con un id inexistente", 400, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
