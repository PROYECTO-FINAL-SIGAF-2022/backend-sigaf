import supertest from "supertest";
import { app, server } from "../index.js";

const API = supertest(app);

const URL = "/api/usuarios";

const testUser = {
  nombre_persona: "test2",
  apellido_persona: "test2",
  dni_persona: "441017902",
  fecha_nac_persona: new Date(),
  email_persona: "test2@gmail.com",
  telefono_persona: "3704234234",
  username_usuario: "tester2",
  password_usuario: "tester2",
};

describe("Crear un nuevo usuario", () => {
  test("Debe retornar el nuevo usuario", async (done) => {
    const response = await API.post(URL)
      .set("Content-Type", "application/json")
      .send(testUser);
    expect(response.statusCode).toEqual(201);
    await done();
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
