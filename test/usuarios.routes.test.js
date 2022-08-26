import supertest from "supertest";
import generarNuevoUsuario from "../helpers/generarNuevoUsuario.js";
import { app, server } from "../index.js";

const API = supertest(app);

const URL = "/api/usuarios";

describe("Crear un nuevo usuario", () => {
  const testUser = generarNuevoUsuario();

  it("Crear un usuario", (done) => {
    API
      .post(URL)
      .send(testUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res);
        return done();
      });
  });

  it("Crear un usuario con datos ya existentes", (done) => {
    API
      .post(URL)
      .send(testUser)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      // TODO: debe esperar un status code 406
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res);
        return done();
      });
  });

  it("Crear un usuarios sin todos los datos", (done) => {
    const { username_usuario, password_usuario, ...restOfTestUser } = testUser;

    const usuarioSinTodosLosDatos = restOfTestUser;
    API
      .post(URL)
      .send(usuarioSinTodosLosDatos)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      // TODO: debe esperar un status code 406
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res);
        return done();
      });
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
    await API
      .get(URL)
      .expect(200);
  });
});

server.close();
