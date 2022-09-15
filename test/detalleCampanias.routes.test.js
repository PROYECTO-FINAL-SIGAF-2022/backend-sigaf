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

const API = SuperTest(app);
const URL = "/api/detalle-campanias";
const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();
    await crearUsuarios();

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Tonelada/s",
    });

    await CultivosModelo.create({
      descripcion_cultivo: "Naranja",
    });

    await CampaniasModelo.create({
      descripcion_campania: "Campaña de Naranja",
      fecha_inicio: "2022/09/08",
      fecha_final: "2023/04/21",
      id_cultivo: "1",
    });

    await DetalleCampanias.create({
      id_campania: "1",
      id_unidad_medida: "1",
      cantidad_cosechada: "12000",

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
  }, 401, API);

  testFunctionPost(URL, "Debe retornar un objeto con el detalle de campania creado", {
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "23000",
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
  await vaciarTablas();
  server.close();
});
