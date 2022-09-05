import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { ActividadesModelo } from "../models/Actividades.model.js";

const API = supertest(app);
const URL = "/api/actividades";

const HEADERS = {
  Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbVVzdWFyaW8iOnsiaWRfdXN1YXJpbyI6MX0sImlhdCI6MTY2MjMyNjcwNn0.5UXnRCxAz1AiTDQ3gvHOF4XahMw20Dn2gEDTsKhsd1U",
};

beforeAll(async () => {
  await vaciarTablas();

  // await UsuariosModelo.destroy({
  //   where: {},
  //   truncate: true,
  // });

  await ActividadesModelo.create({ descripcion_actividad: "Cultivar" });
  await ActividadesModelo.create({ descripcion_actividad: "Regar" });
});

describe("GET /api/actividades", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un json con los registros de actividades", async () => {
    const response = await API.get(URL).set(HEADERS);
    // console.log(response.body);
    expect(response.type).toEqual("application/json");
  });

  // test("Debe retornar un array de actividades", async () => {
  //   const response = await API.get(URL).set(HEADERS);
  //   expect(response.body).toHaveLength(2);
  // });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.statusCode).toEqual(200);
  });
});

describe("GET /api/actividades/:id", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un json", async () => {
    const response = await API.get("/api/actividad/1").set(HEADERS);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get("/api/actividad/1").set(HEADERS);
    expect(response.statusCode).toEqual(200);
  });

  test("Si no existe debe retornar un json con un mensaje de id no existe en la bd", async () => {
    const response = await API.get("/api/actividad/12").set(HEADERS);
    expect(response.type).toEqual("application/json");
  });
});

describe("POST /api/actividades", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Crear una actividad", async () => {
    const response = await API.post("/api/actividad")
      .set("Content-Type", "application/json")
      .send({
        descripcion_actividad: "Plantar",
      })
      .set(HEADERS);

    // console.log(response.body);

    expect(response.statusCode).toEqual(201);
    expect(response.type).toEqual("application/json");
  });

  test("Crear una actividad con datos ya existentes", async () => {
    const response = await API.post("/api/actividad")
      .set("Content-Type", "application/json")
      .send({
        descripcion_actividad: "Plantar",
      })
      .set(HEADERS);

    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  test("Crear una actividad con la descripcion vacia", async () => {
    const response = await API.post("/api/actividad")
      .set("Content-Type", "application/json")
      .send({
        descripcion_actividad: "",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  // test("Crear una actividad con la descripcion en numeros y letras", async () => {
  //   const response = await API.post("/api/actividad")
  //     .set("Content-Type", "application/json")
  //     .send({
  //       descripcion_actividad: "Regar 12",
  //     })
  //     .set(HEADERS);
  //   console.log(response.body);

  //   expect(response.statusCode).toEqual(400);
  //   expect(response.type).toEqual("application/json");
  // });
});

describe("PUT /api/actividad/:id", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Actualizar una actividad", async () => {
    const response = await API.put("/api/actividad/1")
      .set("Content-Type", "application/json")
      .send({
        descripcion_actividad: "sembrarrr",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Actualizar una actividad con un id inexistente", async () => {
    const response = await API.put("/api/actividad/5")
      .set("Content-Type", "application/json")
      .send({
        descripcion_actividad: "sembrarrr",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });

  test("Actualizar una actividad con una descripcion ya existente", async () => {
    const response = await API.put("/api/actividad/5")
      .set("Content-Type", "application/json")
      .send({
        descripcion_actividad: "Cultivar",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });
});

describe("DELETE /api/actividad/:id", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Actualizar una actividad", async () => {
    const response = await API.delete("/api/actividad/1")
      .set("Content-Type", "application/json")
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Eliminar una actividad con un id inexistente", async () => {
    const response = await API.delete("/api/actividad/5")
      .set("Content-Type", "application/json")
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
  });
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
