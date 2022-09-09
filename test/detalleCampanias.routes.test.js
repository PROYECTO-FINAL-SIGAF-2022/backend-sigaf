import SuperTest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../index";
import { DetalleCampanias } from "../models/DetalleCampanias.model";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model";
import { CultivosModelo } from "../models/Cultivos.model";
import { getTokenTest } from "../helpers/getToken";
import { CampaniasModelo } from "../models/Campanias.model";

const API = SuperTest(app);
const URL = "/api/detalle-campanias";
const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();

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
  test("Debe retornar un error al no envia el token", async () => {
    const response = await API.get(URL);

    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un objeto con los registros de detalles de campanias", async () => {
    const response = await API.get(URL).set(HEADERS);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un staus-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.statusCode).toEqual(200);
  });
});

describe(`GET ${URL}/1`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(`${URL}/1`);
    expect(response.statusCode).toEqual(401);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un mensaje de error si el ID no se encuentra en la bd", async () => {
    const response = await API.get(`${URL}/2`).set(HEADERS);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un objeto con el registro encontrado", async () => {
    const response = await API.get(`${URL}/1`).set(HEADERS);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un staus-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });
});

describe(`POST ${URL}`, () => {
  test("Debe retornar un error al enviar el token", async () => {
    const response = await API.get(URL);

    expect(response.statusCode).toEqual(401);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un objeto con el detalle de campania creado", async () => {
    const response = await API.post(URL).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        id_campania: "1",
        id_unidad_medida: "1",
        cantidad_cosechada: "23000",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });
});

describe(`PUT ${URL}/1`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(`${URL}/1`);

    expect(response.statusCode).toEqual(401);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un error al intentar actualizar un detalle de campania con un ID inexistente", async () => {
    const response = await API.put(`${URL}/12`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        id_campania: "1",
        id_unidad_medida: "1",
        cantidad_cosechada: "23000",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un objeto con el detalle de campania actualizado", async () => {
    const response = await API.put(`${URL}/1`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        id_campania: "1",
        id_unidad_medida: "1",
        cantidad_cosechada: "26000",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });
});
afterAll(async () => {
  await vaciarTablas();
  server.close();
});
