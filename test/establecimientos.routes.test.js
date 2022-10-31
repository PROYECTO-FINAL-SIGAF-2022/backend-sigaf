// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { app, server } from "../index.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { getTokenTest } from "../helpers/getToken.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { crearUsuarios } from "../helpers/createUser.js";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions.js";

const API = supertest(app);

const HEADERS = getTokenTest();
const URL = "/api/establecimientos";

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

  await EstablecimientosModelo.create({
    descripcion_establecimiento: "Establecimiento 2",
    georeferencia: "[[[12.385044, 28.486621], [16.506124, 80.648015], [12.686816, 83.218482]],[[13.082680, 80.220218], [12.921599, 22.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de establecimientos", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/1`, "Debe retornar un json", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const sendCrear = {
    descripcion_establecimiento: "establecimiento 3",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "1000",
    id_usuario: 1,
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", sendCrear, 401, API);

  testFunctionPost(URL, "Crear un establecimiento", sendCrear, 201, API, HEADERS);

  testFunctionPost(URL, "Crear un establecimiento con datos ya existentes", sendCrear, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un establecimiento con la descripcion vacia", {
    descripcion_establecimiento: "",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "1000",
    id_usuario: 1,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un establecimiento con la georeferencia vacia", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "",
    superficie: "1000",
    id_usuario: 1,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un establecimiento con la superfice vacia", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "",
    id_usuario: 1,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un establecimiento con el campo de id usuario vacio", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "100",
    id_usuario: "",
  }, 400, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const sendActualizar = {
    descripcion_establecimiento: "Establecimiento 1 Actualizado",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", sendActualizar, 401, API);

  testFunctionPut(`${URL}/1`, "Actualizar un establecimiento", sendActualizar, 200, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un establecimiento con la descripcion vacia", {
    descripcion_establecimiento: "",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Crear un establecimiento con la georeferencia vacia", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "",
    superficie: "1000",
    id_usuario: 1,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Crear un establecimiento con la superfice vacia", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "",
    id_usuario: 1,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Crear un establecimiento con el campo de id usuario vacio", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "100",
    id_usuario: "",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/12`, "Actualizar un establecimeinto con un id inexistente", {
    descripcion_establecimiento: "Establecimiento 4",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "100",
    id_usuario: "",
  }, 400, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar un establecimiento con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200 al eliminar", 200, API, HEADERS);
});
afterAll(async () => {
  // jest.setTimeout(10000);
// await vaciarTablas();
  await server.close();
});
