import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { crearUsuarios } from "../helpers/createUser.js";
import { app, server } from "../index.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";

import { getTokenTest } from "../helpers/getToken.js";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions.js";

const API = supertest(app);
const URL = "/api/parcelas-cultivos";
const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();
    await crearUsuarios();

    await EstablecimientosModelo.create({
      descripcion_establecimiento: "PyFsa",
      georeferencia: "-34.6037,-58.3811",
      superficie: " 100",
      id_usuario: "1",
    });

    await ParcelasModelo.create({
      georeferencia: " -34.6037,-58.3812",
      superficie: " 70",
      id_establecimiento: "1",
    });

    await CultivosModelo.create({
      descripcion_cultivo: "Tomate",
    });

    await CampaniasModelo.create({
      descripcion_campania: "La super campaña de maiz",
      fecha_inicio: "2020/10/10",
      fecha_final: "2021/10/21",
      id_cultivo: "1",
    });

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Toneladas",
    });

    await ParcelasCultivosModelo.create({
      id_parcela: "1",
      id_cultivo: "1",
      id_campania: "1",
      id_unidad_medida: "1",
      cantidad_sembrada: "23131",
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

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const sendCrear = {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", sendCrear, 401, API);
  testFunctionPost(URL, "Debe retornar un error si el id de parcela no existe en la bd", {
    id_parcela: "12",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);
  testFunctionPost(URL, "Debe retornar un error si el id de cultivo no existe en la bd", {
    id_parcela: "1",
    id_cultivo: "12",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);
  testFunctionPost(URL, "Debe retornar un error si el id de campania no existe en la bd", {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "12",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error si el id de unidad de medida no existe en la bd", {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "12",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error si el campo de cantidad sembrada esta vacio", {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "12",
    cantidad_sembrada: "",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un registro", sendCrear, 200, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const sendAtualizar = {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000000",
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", sendAtualizar, 401, API);
  testFunctionPut(`${URL}/1`, "Debe retornar un error si el id de parcela no existe en la bd", {
    id_parcela: "12",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);
  testFunctionPut(`${URL}/1`, "Debe retornar un error si el id de cultivo no existe en la bd", {
    id_parcela: "1",
    id_cultivo: "12",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);
  testFunctionPut(`${URL}/1`, "Debe retornar un error si el id de campania no existe en la bd", {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "12",
    id_unidad_medida: "1",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el id de unidad de medida no existe en la bd", {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "12",
    cantidad_sembrada: "1000",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el campo de cantidad sembrada esta vacio", {
    id_parcela: "1",
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "12",
    cantidad_sembrada: "",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe actualizar 1 registro", sendAtualizar, 200, API, HEADERS);
});

describe(`${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);
  testFunctionDelete(`${URL}/12`, "Debe retornar un error si el ID no existe", 400, API, HEADERS);
  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  await server.close();
});
