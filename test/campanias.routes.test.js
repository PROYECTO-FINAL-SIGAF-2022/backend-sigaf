import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../index";
import { CampaniasModelo } from "../models/Campanias.model";
import { getTokenTest } from "../helpers/getToken";
import { CultivosModelo } from "../models/Cultivos.model";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser";

const API = supertest(app);
const URL = "/api/campanias";

const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();

    await crearUsuarios();

    await CultivosModelo.create({
      descripcion_cultivo: "tomate",
    });

    await CampaniasModelo.create({
      descripcion_campania: "primer Campaña",
      fecha_inicio: "2022/09/5",
      fecha_final: "2023/04/15",
      id_cultivo: "1",

    });

    await CampaniasModelo.create({
      descripcion_campania: "segunda Campaña",
      fecha_inicio: "2022/09/7",
      fecha_final: "2023/04/20",
      id_cultivo: "1",

    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un OBJETO con los registros de campanias", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/3`, "Si no existe debe retornar un OBJETO con un mensaje de id no existe en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe restornar un OBJETO con el registro de campanias encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const sendCampania = {
    descripcion_campania: "tercera Campaña",
    fecha_inicio: "2022/09/9",
    fecha_final: "2023/04/25",
    id_cultivo: "1",
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", sendCampania, 401, API);

  testFunctionPost(URL, "Debe Retornar un OBJETO al crear una nueva Campania", sendCampania, 200, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un mensaje de error si los datos cargados ya coinciden con un registro de la base de datos", sendCampania, 400, API, HEADERS);
});

describe(`PUT ${URL}:id`, () => {
  const sendActualizar = {
    descripcion_campania: "primeraaaa Campañaaaa",
    fecha_inicio: "2022/10/9",
    fecha_final: "2023/08/25",
    id_cultivo: "1",

  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", sendActualizar, 401, API);

  testFunctionPut(`${URL}/1`, "Debe retornar un OBJETO con el registro de campania actualizado", sendActualizar, 200, API, HEADERS);

  testFunctionPut(`${URL}/2`, "Debe retornar un mensaje de error si actualizo una campania con la descripcion ya existente", {
    descripcion_campania: "segunda Campaña",
    fecha_inicio: "2022/10/10",
    fecha_final: "2023/08/27",
    id_cultivo: "1",
  }, 400, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/50`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/50`, "Debe retornar un mensaje de error al intentar eliminar una campania con id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status 200 al eliminar la campania", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
