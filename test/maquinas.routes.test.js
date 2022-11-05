// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { MaquinasModelo } from "../models/Maquinas.model.js";

const API = supertest(app);
const URL = "/api/maquinas";

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

  await MaquinasModelo.create({
    descripcion_maquina: "Tractor",
    tipo_adquisicion_maquina: "compra",
    precio_adquisicion_maquina: "3000000",
    id_establecimiento: "1",
  });

  await MaquinasModelo.create({
    descripcion_maquina: "Arado",
    tipo_adquisicion_maquina: "compra",
    precio_adquisicion_maquina: "1000000",
    id_establecimiento: "1",
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de maquinas", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const nuevaMaquina = {
    descripcion_maquina: "almacen 3",
    tipo_adquisicion_maquina: "compra",
    precio_adquisicion_maquina: "40000",
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", nuevaMaquina, 401, API);

  const maquinaSinDescripcion = { ...nuevaMaquina };
  maquinaSinDescripcion.descripcion_maquina = "";

  testFunctionPost(URL, "Debe retornar un error al crear una maquina con una descripcion existente en la bd o que este vacio", maquinaSinDescripcion, 400, API, HEADERS);

  const maquinaSinTipoAdquisicion = { ...nuevaMaquina };
  maquinaSinTipoAdquisicion.tipo_adquisicion_maquina = "";
  testFunctionPost(URL, "Debe retornar un error al crear un almacen con el tipo de adquisicion invalida", maquinaSinTipoAdquisicion, 400, API, HEADERS);

  const maquinaPrecioAdquisicionInvalido = { ...nuevaMaquina };
  maquinaPrecioAdquisicionInvalido.precio_adquisicion_maquina = "";
  testFunctionPost(URL, "Debe retornar un error al crear un almacen con el precio de adquisicion invalida", maquinaPrecioAdquisicionInvalido, 400, API, HEADERS);

  testFunctionPost(URL, "Crear una maquina", nuevaMaquina, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const actualizarMaquina = {
    descripcion_maquina: "almacen 5",
    tipo_adquisicion_maquina: "compra",
    precio_adquisicion_maquina: "40000",
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", actualizarMaquina, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un almacen con un id inexistente", actualizarMaquina, 400, API, HEADERS);

  const maquinaSinDescripcion = { ...actualizarMaquina };
  maquinaSinDescripcion.descripcion_maquina = "";

  testFunctionPut(`${URL}/5`, "Actualizar una maquina con una descripcion ya existente", maquinaSinDescripcion, 400, API, HEADERS);

  const maquinaTipoAdquisicionInvalido = { ...actualizarMaquina };
  maquinaTipoAdquisicionInvalido.tipo_adquisicion_maquina = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al editar una maquina con el tipo de adquisicion invalida", maquinaTipoAdquisicionInvalido, 400, API, HEADERS);

  const maquinaPrecioAdquisicionInvalido = { ...actualizarMaquina };
  maquinaPrecioAdquisicionInvalido.precio_adquisicion_maquina = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al editar una maquina con el precio de adquisicion invalida", maquinaPrecioAdquisicionInvalido, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar una maquina", actualizarMaquina, 200, API, HEADERS);
});
describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar una maquina con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Eliminar una maquina correctamente", 200, API, HEADERS);
});

describe("PUT VENDER MAQUINA /api/maquinas/:id", () => {
  const venderMaquina = {
    precio_venta_maquina: "2022/11/04",
    fecha_venta_maquina: "90000",
  };

  testFunctionPut("/api/maquinas-vender/1", "Debe retornar un error al no enviar el token", venderMaquina, 401, API);

  testFunctionPut("/api/maquinas-vender/5", "Actualizar una maquina con un id inexistente", venderMaquina, 400, API, HEADERS);

  const maquinaPrevioVentaInvalido = { ...venderMaquina };
  maquinaPrevioVentaInvalido.precio_venta_maquina = "";
  testFunctionPut("/api/maquinas-vender/1", "Debe retornar un error al vender una maquina con el tipo de precio venta", maquinaPrevioVentaInvalido, 400, API, HEADERS);

  const maquinaFechaVentaInvalido = { ...venderMaquina };
  maquinaFechaVentaInvalido.fecha_venta_maquina = "";
  testFunctionPut("/api/maquinas-vender/1", "Debe retornar un error al vender una maquina con la fecha de venta invalida", maquinaFechaVentaInvalido, 400, API, HEADERS);

  testFunctionPut("/api/maquinas-vender/1", "Vender una maquina", venderMaquina, 200, API, HEADERS);
});

afterAll(async () => {
  // jest.setTimeout(10000);
  // await vaciarTablas();
  await server.close();
});
