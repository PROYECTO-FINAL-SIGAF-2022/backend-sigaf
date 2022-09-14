import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";
import { crearUsuarios } from "../helpers/createUser.js";

const API = supertest(app);
const URL = "/api/tipo-productos";

const HEADERS = getTokenTest();

beforeAll(async () => {
  await vaciarTablas();
  await crearUsuarios();

  await TiposProductosModelo.create({
    descripcion_tipo_producto: "Semillas",
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de tipos de productos", 200, API, HEADERS);

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
    descripcion_tipo_producto: "Insecticidas",
  }, 401, API);

  testFunctionPost(URL, "Crear un tipo producto con la descripcion vacia", {
    descripcion_tipo_producto: "",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un tipo de producto con la descripcion ya guardada en a bd", {
    descripcion_tipo_producto: "Semillas",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un tipo de producto", {
    descripcion_tipo_producto: "Insecticidas",
  }, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    descripcion_tipo_producto: "Semillas",
  }, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un tipo de producto con un id inexistente", {
    descripcion_tipo_producto: "Semillas",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar un tipo de producto con una descripcion ya existente", {
    descripcion_tipo_producto: "Semillas",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar una descripcion del tipo de producto", {
    descripcion_tipo_producto: "Efermicidas",
  }, 200, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/30`, "Debe retornar un mensaje de error al intentar eliminar un tipo de producto con id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status 200 al eliminar el tipo de producto", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
