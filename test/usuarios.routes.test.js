import supertest from "supertest";
import { app, server } from "../index.js";

const API = supertest(app);

const URL = "/api/usuarios";

const testUser = {
  nombre_persona: "test10",
  apellido_persona: "test10",
  dni_persona: "101010179010",
  fecha_nac_persona: new Date(),
  email_persona: "test10@gmail.com",
  telefono_persona: "670666610",
  username_usuario: "tester10",
  password_usuario: "tester10",
  id_tipo_usuario: 1,
};

describe("Crear un nuevo usuario", () => {
  // test("Debe retornar el nuevo usuario", async () => {
  //   const response = await API.post(URL)
  //     .set("Content-Type", "application/json")
  //     .send(testUser)
  //     .expect(201)
  //     .end((err, res) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(res);
  //       }
  //     });
  //   expect(response.statusCode).toEqual(201);
  // });
  it("responds with json", (done) => {
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
