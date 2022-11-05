// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { AlmacenesModelo } from "../models/Almacenes.model.js";
import { crearUsuarios } from "../helpers/createUser.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

const API = supertest(app);
const URL = "/api/almacenes";

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

  await AlmacenesModelo.create({
    descripcion_almacen: "Almacen 1",
    tipo_adquisicion: "compra",
    precio_adquisicion: "20000",
    id_establecimiento: "1",
  });

  await AlmacenesModelo.create({
    descripcion_almacen: "Almacen 2",
    tipo_adquisicion: "compra",
    precio_adquisicion: "30000",
    id_establecimiento: "1",
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de almacenes", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const nuevoAlmacen = {
    descripcion_almacen: "almacen 3",
    tipo_adquisicion: "compra",
    precio_adquisicion: "40000",
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", nuevoAlmacen, 401, API);

  const almacenSinDescripcion = { ...nuevoAlmacen };
  almacenSinDescripcion.descripcion_almacen = "";

  testFunctionPost(URL, "Debe retornar un error al crear un almacen con una descripcion existente en la bd o que este vacio", almacenSinDescripcion, 400, API, HEADERS);

  const almacenTipoAdquisicionInvalido = { ...nuevoAlmacen };
  almacenTipoAdquisicionInvalido.tipo_adquisicion = "";
  testFunctionPost(URL, "Debe retornar un error al crear un almacen con el tipo de adquisicion invalida", almacenTipoAdquisicionInvalido, 400, API, HEADERS);

  const almacenPrecioAdquisicionInvalido = { ...nuevoAlmacen };
  almacenPrecioAdquisicionInvalido.precio_adquisicion = "";
  testFunctionPost(URL, "Debe retornar un error al crear un almacen con el precio de adquisicion invalida", almacenPrecioAdquisicionInvalido, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un almacen", nuevoAlmacen, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const actualizarAlmacen = {
    descripcion_almacen: "almacen 4",
    tipo_adquisicion: "compra",
    precio_adquisicion: "60000",
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", actualizarAlmacen, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un almacen con un id inexistente", actualizarAlmacen, 400, API, HEADERS);

  const almacenSinDescripcion = { ...actualizarAlmacen };
  almacenSinDescripcion.descripcion_almacen = "";

  testFunctionPut(`${URL}/5`, "Actualizar un almacen con una descripcion ya existente", almacenSinDescripcion, 400, API, HEADERS);

  const almacenTipoAdquisicionInvalido = { ...actualizarAlmacen };
  almacenTipoAdquisicionInvalido.tipo_adquisicion = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al editar un almacen con el tipo de adquisicion invalida", almacenTipoAdquisicionInvalido, 400, API, HEADERS);

  const almacenPrecioAdquisicionInvalido = { ...actualizarAlmacen };
  almacenPrecioAdquisicionInvalido.precio_adquisicion = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al editar un almacen con el precio de adquisicion invalida", almacenPrecioAdquisicionInvalido, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar una almacen", actualizarAlmacen, 200, API, HEADERS);
});
describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar un almacen con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Eliminar un almacen correctamente", 200, API, HEADERS);
});

describe("PUT VENDER ALMACEN /api/almacenes/:id", () => {
  const venderAlmacen = {
    fecha_venta: "2022/11/04",
    precio_venta: "90000",
  };

  testFunctionPut("/api/almacenes-vender/1", "Debe retornar un error al no enviar el token", venderAlmacen, 401, API);

  testFunctionPut("/api/almacenes-vender/5", "Actualizar un almacen con un id inexistente", venderAlmacen, 400, API, HEADERS);

  const almacenPrevioVentaInvalido = { ...venderAlmacen };
  almacenPrevioVentaInvalido.precio_venta = "";
  testFunctionPut("/api/almacenes-vender/1", "Debe retornar un error al vender un almacen con el tipo de precio venta", almacenPrevioVentaInvalido, 400, API, HEADERS);

  const almacenFechaVentaInvalido = { ...venderAlmacen };
  almacenFechaVentaInvalido.fecha_venta = "";
  testFunctionPut("/api/almacenes-vender/1", "Debe retornar un error al vender un almacen con la fecha de venta invalida", almacenFechaVentaInvalido, 400, API, HEADERS);

  testFunctionPut("/api/almacenes-vender/1", "Vender un almacen", venderAlmacen, 200, API, HEADERS, true);
});

afterAll(async () => {
  // jest.setTimeout(10000);
  // await vaciarTablas();
  await server.close();
});
