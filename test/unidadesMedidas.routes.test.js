import supertest from "supertest";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { crearUsuarios } from "../helpers/createUser.js";
import { app, server } from "../index";
import { getTokenTest } from "../helpers/getToken.js";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions.js";

const API = supertest(app);
const URL = "/api/unidades-medidas";
const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();
    await crearUsuarios();

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Kilogramos",
    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  testFunctionPost(URL, "Debe retornar un error al no enviar el token", {
    descripcion_unidad_medida: "Toneladas",
  }, 401, API);

  testFunctionPost(URL, "Crear una unidad de medida", {
    descripcion_unidad_medida: "Toneladas",
  }, 200, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear una unidad de medida con una descripcion existente en la bd", {
    descripcion_unidad_medida: "Kilogramos",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear una unidad de medida con la descripcion vacia", {
    descripcion_unidad_medida: "",
  }, 400, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    descripcion_unidad_medida: "Toneladas",
  }, 401, API);

  testFunctionPut(`${URL}/1`, "Actualizar una unidad de medida", {
    descripcion_unidad_medida: "Toneladitas",
  }, 200, API, HEADERS);

  testFunctionPut(`${URL}/13`, "Actualizar una unidad de medida con un id inexistente", {
    descripcion_unidad_medida: "Toneladas",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar una unidad de medida con una descripcion ya existente", {
    descripcion_unidad_medida: "Kilogramos",
  }, 400, API, HEADERS);
});
describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar una actividad con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

afterAll(async () => {
  try {
    await vaciarTablas();
    await server.close();
  } catch (error) {
    console.log(error);
  }
});
