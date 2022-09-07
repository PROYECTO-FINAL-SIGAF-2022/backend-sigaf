import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
// import { ActividadesModelo } from "../models/Actividades.model.js";

const API = supertest(app);

const HEADERS = getTokenTest();

beforeAll(async () => {
  await vaciarTablas();

  await CultivosModelo.create({ descripcion_cultivo: "Maiz" });
  await CultivosModelo.create({ descripcion_cultivo: "Soja" });
});

describe("GET /api/actividades", () => {

});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
