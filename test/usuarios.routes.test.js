import supertest from "supertest";
import jest from "jest";
import generarNuevoUsuario from "../helpers/generarNuevoUsuario.js";
import { app, server } from "../index.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

const API = supertest(app);

const URL = "/api/usuarios";

const usuariosIniciales = {
  usuarios1: generarNuevoUsuario(),
  usuarios2: generarNuevoUsuario(),
};

beforeAll(async () => {
  await UsuariosModelo.destroy({ where: {} });

  await UsuariosModelo.create(usuariosIniciales[1]);
  await UsuariosModelo.create(usuariosIniciales[1]);
});

describe("Crear un nuevo usuario", () => {
  it("Crear un usuario", async (done) => {
    const request = await API.post(URL)
      .set("Content-Type", "application/json")
      .send(generarNuevoUsuario());
    expect(request.statusCode).toEqual(200);
    end((err) => {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it.skip("Crear un usuario con datos ya existentes", (done) => {
    API
      .post(URL)
      .send(testUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      // TODO: debe esperar un status code 406
      .expect(500)
      .end(() => done());
  });

  it.skip("Crear un usuarios sin todos los datos", (done) => {
    const { username_usuario, password_usuario, ...restOfTestUser } = testUser;

    const usuarioSinTodosLosDatos = restOfTestUser;
    API
      .post(URL)
      .send(usuarioSinTodosLosDatos)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      // TODO: debe esperar un status code 406
      .expect(500)
      .end(() => done());
  });
});

describe("Obtener todos los usuarios", () => {
  test("Debe retornar un json", async () => {
    await API
      .get(URL)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  });

  test("Debe retornar un status-code 200", async () => {
    const request = await API.get(URL);
    expect(request.statusCode).toEqual(200);
  });
});

afterAll(() => {
  server.close();
});
