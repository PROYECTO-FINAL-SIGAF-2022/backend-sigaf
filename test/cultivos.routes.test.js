// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import {
  testFunctionGet, testFunctionPost, testFunctionDelete, testFunctionPut,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

const API = supertest(app);

const HEADERS = getTokenTest();
const URL = "/api/cultivos";

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

  await CultivosModelo.create({ descripcion_cultivo: "Maiz", id_establecimiento: "1" });
  await CultivosModelo.create({ descripcion_cultivo: "Soja", id_establecimiento: "1" });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de cultivos", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/1`, "Debe retornar un json", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const sendCultivos = {
    descripcion_cultivo: "Tomate",
    id_establecimiento: 1,
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", sendCultivos, 401, API);

  const cultivoSinEstablecimiento = { ...sendCultivos };
  cultivoSinEstablecimiento.id_establecimiento = 5;

  testFunctionPost(URL, "Debe Retornar un status-code 400 si no se envia un id_establecimiento valido", cultivoSinEstablecimiento, 400, API, HEADERS);

  const cultivoConDatosDuplicados = { ...sendCultivos };
  cultivoConDatosDuplicados.descripcion_cultivo = "Soja";

  testFunctionPost(URL, "Crear un cultivo con datos ya existentes", cultivoConDatosDuplicados, 400, API, HEADERS, true);
  testFunctionPost(URL, "Crear un cultivo", sendCultivos, 201, API, HEADERS, true);
});

describe(`PUT ${URL}/:id`, () => {
  const sendActualizar = {
    descripcion_cultivo: "tomateee",
  };
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", sendActualizar, 401, API);

  testFunctionPut(`${URL}/1`, "Actualizar un cultivo", sendActualizar, 200, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un cultivo con la descripcion vacia", { descripcion_cultivo: "" }, 400, API, HEADERS);

  testFunctionPut(`${URL}/10`, "Actualizar un cultivo con un id inexistente", sendActualizar, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un cultivo con una descripcion ya existente", sendActualizar, 400, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API); testFunctionDelete(`${URL}/50`, "Eliminar un cultivo con un id inexistente", 400, API, HEADERS);
});

afterAll(async () => {
  // jest.setTimeout(10000);
// await vaciarTablas();
  await server.close();
});
