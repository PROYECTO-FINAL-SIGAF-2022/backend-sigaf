import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import {
  testFunctionGet, testFunctionPost, testFunctionDelete, testFunctionPut,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";

const API = supertest(app);

const HEADERS = getTokenTest();
const URL = "/api/cultivos";

beforeAll(async () => {
  await vaciarTablas();
  await crearUsuarios();

  await CultivosModelo.create({ descripcion_cultivo: "Maiz" });
  await CultivosModelo.create({ descripcion_cultivo: "Soja" });
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
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", sendCultivos, 401, API);

  testFunctionPost(URL, "Crear un cultivo", sendCultivos, 201, API, HEADERS);

  testFunctionPost(URL, "Crear un cultivo con datos ya existentes", sendCultivos, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un cultivo con la descripcion vacia", { descripcion_cultivo: "" }, 400, API, HEADERS);
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
  await vaciarTablas();
  await server.close();
});
