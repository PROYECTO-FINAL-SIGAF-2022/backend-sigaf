import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
// import { ActividadesModelo } from "../models/Actividades.model.js";

const API = supertest(app);

const HEADERS = getTokenTest();
const URL = "/api/cultivos";

beforeAll(async () => {
  await vaciarTablas();

  await CultivosModelo.create({ descripcion_cultivo: "Maiz" });
  await CultivosModelo.create({ descripcion_cultivo: "Soja" });
});

describe(`GET ${URL}`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un json con los registros de cultivos", async () => {
    const response = await API.get(URL).set(HEADERS);
    // console.log(response.body);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.statusCode).toEqual(200);
  });
});

describe(`GET ${URL}/:id`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un json", async () => {
    const response = await API.get(`${URL}/1`).set(HEADERS);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(`${URL}/1`).set(HEADERS);
    expect(response.statusCode).toEqual(200);
  });

  test("Si no existe debe retornar un json con un mensaje de id no existe en la bd", async () => {
    const response = await API.get(`${URL}/12`).set(HEADERS);
    expect(response.type).toEqual("application/json");

    const mensajeRespuesta = response.body?.errors[0]?.msg;

    expect(mensajeRespuesta).toEqual("El id enviado no se coincide con ningun registro de la base de datos");
  });
});

describe(`POST ${URL}`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Crear un cultivo", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "Frutilla",
      })
      .set(HEADERS);

    // console.log(response.body);

    expect(response.statusCode).toEqual(201);
    expect(response.type).toEqual("application/json");
  });

  test("Crear un cultivo con datos ya existentes", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "Frutilla",
      })
      .set(HEADERS);

    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;

    expect(mensajeRespuesta).toEqual("El cultivo ingresado ya se encuentra en la bd");
  });

  test("Crear un cultivo con la descripcion vacia", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El cultivo es requerido");
  });
});

describe(`PUT ${URL}/:id`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Actualizar un cultivo", async () => {
    const response = await API.put(`${URL}/1`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "Uvas",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Actualizar un cultivo con la descripcion vacia", async () => {
    const response = await API.put(`${URL}/1`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");

    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El cultivo es requerido");
  });

  test("Actualizar un cultivo con un id inexistente", async () => {
    const response = await API.put(`${URL}/5`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "Uvas",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El id enviado no se coincide con ningun registro de la base de datos");
  });

  test("Actualizar un cultivo con una descripcion ya existente", async () => {
    const response = await API.put(`${URL}/5`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_cultivo: "Uvas",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[1]?.msg;
    expect(mensajeRespuesta).toEqual("El cultivo ingresado ya se encuentra en la bd");
  });
});

describe(`DELETE ${URL}/:id`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.delete(`${URL}/1`);
    expect(response.statusCode).toEqual(401);
  });

  test("Eliminar un cultivo con un id inexistente", async () => {
    const response = await API.delete(`${URL}/5`)
      .set("Content-Type", "application/json")
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El id enviado no se coincide con ningun registro de la base de datos");
  });
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
