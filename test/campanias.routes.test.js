import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../index";
import { CampaniasModelo } from "../models/Campanias.model";
import { getTokenTest } from "../helpers/getToken";
import { CultivosModelo } from "../models/Cultivos.model";

const API = supertest(app);
const URL = "/api/campanias";

const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    // await vaciarTablas();

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
  test("debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un OBJETO con los registros de campanias", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.statusCode).toEqual(200);
  });
});

describe(`GET ${URL}/:id`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(`${URL}/1`);
    expect(response.statusCode).toEqual(401);
  });

  test("Si no existe debe retornar un OBJETO con un mensaje de id no existe en la bd", async () => {
    const response = await API.get(`${URL}/1`).set(HEADERS);
    expect(response.type).toEqual("application/json");
  });

  test("Debe restornar un OBJETO con el registro de campanias encontrado", async () => {
    const response = await API.get(`${URL}/1`).set(HEADERS);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(`${URL}/1`).set(HEADERS);

    expect(response.statusCode).toEqual(200);
  });
});

describe(`POST ${URL}`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe Retornar un OBJETO al crear una nueva Campania", async () => {
    const response = await API.post(URL).set(HEADERS)
      .set("constent-type", "application/json")
      .send({
        descripcion_campania: "tercera Campaña",
        fecha_inicio: "2022/09/9",
        fecha_final: "2023/04/25",
        id_cultivo: "1",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un mensaje de error si los datos cargados ya coinciden con un registro de la base de datos", async () => {
    const response = await API.post(URL).set(HEADERS)
      .set("Content-Type", "application/json")
      .send({
        descripcion_campania: "tercera Campaña",
        fecha_inicio: "2022/09/9",
        fecha_final: "2023/04/25",
        id_cultivo: "1",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });
});

describe(`PUT ${URL}:id`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(`${URL}/1`);

    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un OBJETO con el registro de campania actualizado", async () => {
    const response = await API.put(`${URL}/1`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        descripcion_campania: "primeraaaa Campañaaaa",
        fecha_inicio: "2022/10/9",
        fecha_final: "2023/08/25",
        id_cultivo: "1",

      });

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un mensaje de error si actualizo una campania con la descripcion ya existente", async () => {
    const response = await API.put(`${URL}/1`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        descripcion_campania: "segunda Campaña",
        fecha_inicio: "2022/10/10",
        fecha_final: "2023/08/27",
        id_cultivo: "1",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un error al actualizar una campania con id inexistente", async () => {
    const response = await API.put(`${URL}/40`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        descripcion_campania: "segunda Campaña",
        fecha_inicio: "2022/10/10",
        fecha_final: "2023/08/27",
        id_cultivo: "1",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });
});

describe(`DELETE ${URL}/:id`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.delete(`${URL}/1`);

    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un mensaje de error al intentar eliminar una campania con id inexistente", async () => {
    const response = await API.delete(`${URL}/50`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        descripcion_campania: "segunda Campaña",
        fecha_inicio: "2022/10/10",
        fecha_final: "2023/08/27",
        id_cultivo: "1",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status 200 al eliminar la campania", async () => {
    const response = await API.delete(`${URL}/1`).set(HEADERS)
      .set("content-type", "application/json")
      .send({
        activo: false,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });
});

afterAll(async () => {
  await vaciarTablas();

  server.close();
});
