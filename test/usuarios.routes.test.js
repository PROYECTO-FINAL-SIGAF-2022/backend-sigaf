import supertest from "supertest";
import generarNuevoUsuario from "../helpers/generarNuevoUsuario.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

const API = supertest(app);

const URL = "/api/usuarios";

const usuariosIniciales = {
  usuarios1: generarNuevoUsuario(),
  usuarios2: generarNuevoUsuario(),
};

beforeAll(async () => {
  try {
    // console.log(usuariosIniciales);
    await vaciarTablas();

    // await UsuariosModelo.destroy({
    //   where: {},
    //   truncate: true,
    // });
    await TiposUsuariosModelo.create({ descripcion_tipo_usuario: "Administrador" });
    await UsuariosModelo.create(usuariosIniciales.usuarios1);
    await UsuariosModelo.create(usuariosIniciales.usuarios2);
  } catch (error) {
    // console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  test("Debe retornar un json", async () => {
    const response = await API.get(URL);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un array de 2 usuarios", async () => {
    const response = await API.get(URL);
    // console.log(response.body);
    expect(response.body).toHaveLength(2);
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(URL);
    expect(response.statusCode).toEqual(200);
  });
});

describe(`GET ${URL}/:id`, () => {
  test("Debe retornar un json", async () => {
    const response = await API.get(`${URL}/1`);
    // console.log(response.body);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(`${URL}/1`);
    expect(response.statusCode).toEqual(200);
  });

  test("Si no existe deve retornar un status-code 404", async () => {
    const response = await API.get(`${URL}/12345`);
    expect(response.statusCode).toEqual(404);
  });

  test("Si no existe deve retornar texto plano", async () => {
    const response = await API.get(`${URL}/12345`);
    expect(response.type).toEqual("text/plain");
  });
});

describe(`POST ${URL}`, () => {
  test("Crear un usuario", async () => {
    const response = await API.post(URL)
      .set("Content-Type", "application/json")
      .send(generarNuevoUsuario());
    expect(response.statusCode).toEqual(201);
    expect(response.type).toEqual("application/json");
  });

  test("Crear un usuario con datos ya existentes", async () => {
    const equalUser = generarNuevoUsuario();

    await API.post(URL)
      .set("Content-Type", "application/json")
      .send(equalUser);

    const userTwo = await API.post(URL)
      .set("Content-Type", "application/json")
      .send(equalUser);
    expect(userTwo.statusCode).toEqual(406);
  });

  test("Crear un usuarios sin todos los datos", async () => {
    const { username_usuario, password_usuario, ...restOfTestUser } = generarNuevoUsuario();
    const usuarioSinTodosLosDatos = restOfTestUser;

    const response = await API.post(URL)
      .set("Content-Type", "application/json")
      .send(usuarioSinTodosLosDatos);

    expect(response.statusCode).toEqual(406);
  });
});

describe(`PUT ${URL}/:id`, () => {
  test("Actualizar un usuario", async () => {
    const response = await API.put(`${URL}/1`)
      .set("Content-Type", "application/json")
      .send({
        username_usuario: "nuevo_username",
        password_usuario: "nuevo_password",
      });
    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  // TODO: "Actualizar un usuario con datos ya existentes"

  // test("Actualizar un usuario con datos ya existentes", async () => {
  //   const equalUser = generarNuevoUsuario();

  //   await API.post(URL)
  //     .set("Content-Type", "application/json")
  //     .send(equalUser);

  //   const userTwo = await API.put(URL)
  //     .set("Content-Type", "application/json")
  //     .send(equalUser);
  //   expect(userTwo.statusCode).toEqual(406);
  // });
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
