// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { ActividadesModelo } from "../models/Actividades.model.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

const API = supertest(app);
const URL = "/api/actividades";

const HEADERS = getTokenTest();

beforeAll(async () => {
  jest.setTimeout(10000);
  await vaciarTablas();
  await crearUsuarios();

  await EstablecimientosModelo.create({
    descripcion_establecimiento: "Establecimiento 1",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  });

  await ActividadesModelo.create({ descripcion_actividad: "Cultivar", id_establecimiento: 1 });
  await ActividadesModelo.create({ descripcion_actividad: "Regar", id_establecimiento: 1 });
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

  testFunctionPost(URL, "Debe retornar un error al crear una actividad con una descripcion existente en la bd", {
    descripcion_actividad: "Cultivar",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear una actividad con la descripcion vacia", {
    descripcion_actividad: "",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear una actividad", {
    descripcion_actividad: "Plantarassa",
  }, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    descripcion_actividad: "Plantar",
  }, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar una actividad con un id inexistente", {
    descripcion_actividad: "sembrarrr",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar una actividad con una descripcion ya existente", {
    descripcion_actividad: "Cultivar",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar una actividad", {
    descripcion_actividad: "sembrarrr",
  }, 200, API, HEADERS);
});
describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar una actividad con un id inexistente", 400, API, HEADERS);
});

afterAll(async () => {
  // jest.setTimeout(10000);
  // await vaciarTablas();
  await server.close();
});
