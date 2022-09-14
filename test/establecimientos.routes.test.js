import supertest from "supertest";
import { app, server } from "../index.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { getTokenTest } from "../helpers/getToken.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { crearUsuarios } from "../helpers/createUser.js";

const API = supertest(app);

const HEADERS = getTokenTest();
const URL = "/api/establecimientos";



beforeAll(async () => {
  await vaciarTablas();

  await crearUsuarios();

  await EstablecimientosModelo.create({
    descripcion_establecimiento: "Establecimiento 1",
    georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  });

  await EstablecimientosModelo.create({
    descripcion_establecimiento: "Establecimiento 2",
    georeferencia: "[[[12.385044, 28.486621], [16.506124, 80.648015], [12.686816, 83.218482]],[[13.082680, 80.220218], [12.921599, 22.594563],[15.828126, 78.037279]]]",
    superficie: "20",
    id_usuario: 1,
  });
});

describe(`GET ${URL}`, () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(401);
  });

  test("Debe retornar un json con los registros de establecimientos", async () => {
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

  test("Crear un establecimiento", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "establecimiento 3",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "1000",
        id_usuario: 1,
      })
      .set(HEADERS);

    // console.log(response.body);

    expect(response.statusCode).toEqual(201);
    expect(response.type).toEqual("application/json");
  });

  test("Crear un establecimiento con datos ya existentes", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "establecimiento 3",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "1000",
        id_usuario: 1,
      })
      .set(HEADERS);

    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;

    expect(mensajeRespuesta).toEqual("El establecimiento ingresado ya se encuentra en la bd");
  });

  test("Crear un establecimiento con la descripcion vacia", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "1000",
        id_usuario: 1,
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("La descripcion del establecimiento es requerido");
  });

  test("Crear un establecimiento con la georeferencia vacia", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "",
        superficie: "1000",
        id_usuario: 1,
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("La georeferencia del establecimiento es requerido");
  });

  test("Crear un establecimiento con la superfice vacia", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "",
        id_usuario: 1,
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("La superficie del establecimiento es requerido");
  });

  test("Crear un establecimiento con el campo de id usuario vacio", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "100",
        id_usuario: "",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El id usuario no puede estar vacio");
  });
});

describe(`PUT ${URL}/:id`, () => {
  test("Debe retornar un status code 401 al no enviar el token", async () => {
    const response = await API.get(URL);
    // console.log(response.body);
    expect(response.statusCode).toEqual(401);
  });

  test("Actualizar un establecimiento", async () => {
    const response = await API.put(`${URL}/1`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 1 Actualizado",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "20",
        id_usuario: 1,
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Actualizar un establecimiento con la descripcion vacia", async () => {
    const response = await API.put(`${URL}/1`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "20",
        id_usuario: 1,
      })
      .set(HEADERS);
    console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");

    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("La descripcion del establecimiento es requerido");
  });

  test("Crear un establecimiento con la georeferencia vacia", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "",
        superficie: "1000",
        id_usuario: 1,
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("La georeferencia del establecimiento es requerido");
  });

  test("Crear un establecimiento con la superfice vacia", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "",
        id_usuario: 1,
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("La superficie del establecimiento es requerido");
  });

  test("Crear un establecimiento con el campo de id usuario vacio", async () => {
    const response = await API.post(`${URL}`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "100",
        id_usuario: "",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El id usuario no puede estar vacio");
  });

  test("Actualizar un establecimeinto con un id inexistente", async () => {
    const response = await API.put(`${URL}/5`)
      .set("Content-Type", "application/json")
      .send({
        descripcion_establecimiento: "Establecimiento 4",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "100",
        id_usuario: "1",
      })
      .set(HEADERS);
    // console.log(response.body);

    expect(response.statusCode).toEqual(400);
    expect(response.type).toEqual("application/json");
    const mensajeRespuesta = response.body?.errors[0]?.msg;
    expect(mensajeRespuesta).toEqual("El id enviado no se coincide con ningun registro de la base de datos");
  });
  // });

  describe(`DELETE ${URL}/:id`, () => {
    test("Debe retornar un error al no enviar el token", async () => {
      const response = await API.delete(`${URL}/1`);
      expect(response.statusCode).toEqual(401);
    });

    test("Eliminar un establecimiento con un id inexistente", async () => {
      const response = await API.delete(`${URL}/5`)
        .set("Content-Type", "application/json")
        .set(HEADERS);
      console.log(response.body);

      expect(response.statusCode).toEqual(400);
      expect(response.type).toEqual("application/json");
      const mensajeRespuesta = response.body?.errors[0]?.msg;
      expect(mensajeRespuesta).toEqual("El id enviado no se coincide con ningun registro de la base de datos");
    });

    test("Debe retornar un status-code 200 al eliminar", async () => {
      const response = await API.get(`${URL}/1`).set(HEADERS);
      expect(response.statusCode).toEqual(200);
    });
  });
});
afterAll(async () => {
  await vaciarTablas();
  server.close();
});
