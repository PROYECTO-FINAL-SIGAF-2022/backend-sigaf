// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { ProveedoresModelo } from "../models/Proveedores.model.js";
import { crearUsuarios } from "../helpers/createUser.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

const API = supertest(app);
const URL = "/api/proveedores";

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

  await ProveedoresModelo.create({
    nombre_proveedor: "Nombre Proveedor 1",
    telefono_proveedor: "3704651212",
    direccion_proveedor: "Direccion Proveedor 1",
    id_establecimiento: "1",
  });

  await ProveedoresModelo.create({
    nombre_proveedor: "Nombre Proveedor 2",
    telefono_proveedor: "3704651213",
    direccion_proveedor: "Direccion Proveedor 2",
    id_establecimiento: "1",
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de proveedores", 200, API, HEADERS);

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
    nombre_proveedor: "Nombre Proveedor 2",
    telefono_proveedor: "3704651212",
    direccion_proveedor: "Direccion Proveedor 2",
  }, 401, API);

  //   testFunctionPost(URL, "Debe retornar un error al crear un proveedor con datos ya existentes en la bd", {
  //     nombre_proveedor: "Nombre Proveedor 1",
  //     telefono_proveedor: "Telefono Proveedor 1",
  //     direccion_proveedor: "Direccion Proveedor 1",
  //   }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con un nombre vacio", {
    nombre_proveedor: "",
    telefono_proveedor: "3704651213",
    direccion_proveedor: "Direccion Proveedor 2",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con un nombre vacio", {
    nombre_proveedor: "",
    telefono_proveedor: "3704651214",
    direccion_proveedor: "Direccion Proveedor 2",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con un nombre ya existentes en la bd", {
    nombre_proveedor: "Nombre Proveedor 1",
    telefono_proveedor: "3704651712",
    direccion_proveedor: "Direccion Proveedor 3",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con un telefono vacio", {
    nombre_proveedor: "Nombre Proveedor 2",
    telefono_proveedor: "",
    direccion_proveedor: "Direccion Proveedor 1",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con un telefono ya existentes en la bd", {
    nombre_proveedor: "Nombre Proveedor 2",
    telefono_proveedor: "3704651212",
    direccion_proveedor: "Direccion Proveedor 3",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con una dirección vacia", {
    nombre_proveedor: "Nombre Proveedor 2",
    telefono_proveedor: "3704651214",
    direccion_proveedor: "",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear un proveedor con una dirección ya existente en la bd", {
    nombre_proveedor: "Nombre Proveedor 2",
    telefono_proveedor: "3704651214",
    direccion_proveedor: "Direccion Proveedor 1",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear una actividad", {
    nombre_proveedor: "Nombre Proveedor 4",
    telefono_proveedor: "3704651219",
    direccion_proveedor: "Direccion Proveedor 4",
  }, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    nombre_proveedor: "Nombre Proveedor 5",
    telefono_proveedor: "3704651216",
    direccion_proveedor: "Direccion Proveedor 5",
  }, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un proveedor con un id inexistente", {
    nombre_proveedor: "Nombre Proveedor 5",
    telefono_proveedor: "3704651216",
    direccion_proveedor: "Direccion Proveedor 5",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/2`, "Actualizar un proveedor con un nombre de proveedor ya existente en la bd", {
    nombre_proveedor: "Nombre Proveedor 1",
    telefono_proveedor: "3704651217",
    direccion_proveedor: "Direccion Proveedor 17",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/2`, "Actualizar un proveedor con un telefono ya existente en la bd", {
    nombre_proveedor: "Nombre Proveedor 16",
    telefono_proveedor: "3704651212",
    direccion_proveedor: "Direccion Proveedor 16",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/2`, "Actualizar un proveedor con una direccion ya existente en la bd", {
    nombre_proveedor: "Nombre Proveedor 1",
    telefono_proveedor: "3704651213",
    direccion_proveedor: "Direccion Proveedor 1",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un proveedor", {
    nombre_proveedor: "Nombre Proveedor 10",
    telefono_proveedor: "3704651240",
    direccion_proveedor: "Direccion Proveedor 10",
  }, 200, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/30`, "Debe retornar un mensaje de error al intentar eliminar un proveedor con id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status 200 al eliminar un proveedor", 200, API, HEADERS);
});

afterAll(async () => {
  // jest.setTimeout(10000);
// await vaciarTablas();
  await server.close();
});
