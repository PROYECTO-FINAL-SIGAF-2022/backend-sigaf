// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import SuperTest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../index";
import { DetalleCampanias } from "../models/DetalleCampanias.model";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model";
import { CultivosModelo } from "../models/Cultivos.model";
import { getTokenTest } from "../helpers/getToken";
import { CampaniasModelo } from "../models/Campanias.model";
import { crearUsuarios } from "../helpers/createUser";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model";

const API = SuperTest(app);
const URL = "/api/detalle-campanias";
const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    jest.setTimeout(10000);
    await vaciarTablas();
    await crearUsuarios();

    await EstablecimientosModelo.create({
      descripcion_establecimiento: "Establecimiento 1",
      georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
      superficie: "20",
      id_usuario: 1,
    });

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Tonelada/s",
    });

    await CultivosModelo.create({
      descripcion_cultivo: "Naranja",
      id_establecimiento: "1",
    });

    await CampaniasModelo.create({
      descripcion_campania: "Campaña de Naranja",
      fecha_inicio: "2022/09/08",
      fecha_final: "2023/04/21",
      id_cultivo: "1",
      id_establecimiento: "1",
    });

    await DetalleCampanias.create({
      id_campania: "1",
      id_unidad_medida: "1",
      cantidad_cosechada: "12000",
      id_establecimiento: "1",
    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no envia el token", 401, API);

  testFunctionGet(URL, "Debe retornar un objeto con los registros de detalles de campanias", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un staus-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/1`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/2`, "Debe retornar un mensaje de error si el ID no se encuentra en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un objeto con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un staus-code 200", 200, API, HEADERS);
});
describe(`POST ${URL}`, () => {
  testFunctionPost(URL, "Debe retornar un error al enviar el token", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
    id_establecimiento: "1",
  }, 401, API);

  testFunctionPost(URL, "Debe retornar un error al enviar un id_campania no valido", {
    id_campania: "3",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
    id_establecimiento: "1",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al enviar un id_unidad_medida no valido", {
    id_campania: "1",
    id_unidad_medida: "3",
    cantidad_cosechada: "23000",
    id_establecimiento: "1",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al enviar un id_establecimiento no valido", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
    id_establecimiento: "4",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un objeto con el detalle de campania creado", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
    id_establecimiento: "1",
  }, 200, API, HEADERS);
});

describe(`PUT ${URL}/1`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
  }, 401, API);

  testFunctionPut(`${URL}/12`, "Debe retornar un error al intentar actualizar un detalle de campania con un ID inexistente", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un objeto con el detalle de campania actualizado", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "26000",
  }, 200, API, HEADERS);
});

describe(`DELETE ${URL}/1`, () => {
  testFunctionDelete(`${URL}/12`, "Debe retornar un error si el ID no se encuentra en la bd", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

afterAll(async () => {
  // jest.setTimeout(10000);
// await vaciarTablas();
  await server.close();
});
