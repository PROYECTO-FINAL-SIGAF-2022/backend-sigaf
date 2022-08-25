import supertest from "supertest";
import { app, server } from "../index.js";

const api = supertest(app);

describe("Rutas de usuarios", () => {
  test("response users with array of users", async () => {
    await api
      .get("/api/get-user")
      .expect("Content-Type", /json/)
      .expect(200);
  });

  server.close();
});
