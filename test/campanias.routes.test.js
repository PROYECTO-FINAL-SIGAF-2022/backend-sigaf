import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app } from "../index";
import { CampaniasModelo } from "../models/Campanias.model";

const API = supertest(app);
const URL = "/api/campania";

const HEADERS = {
  Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbVVzdWFyaW8iOnsiaWRfdXN1YXJpbyI6MX0sImlhdCI6MTY2MjMyNjcwNn0.5UXnRCxAz1AiTDQ3gvHOF4XahMw20Dn2gEDTsKhsd1U",
};

beforeAll(async () => {

  try {

    
  await vaciarTablas();

  await CampaniasModelo.create({
    descripcion_campania: "primer Campaña",
    fehca_inicio: "2022/09/5",
    fecha_final: "2023/04/15",
    id_cultivo: "1",

  });

  await CampaniasModelo.create({
    descripcion_campania: "segunda Campaña",
    fehca_inicio: "2022/09/7",
    fecha_final: "2023/04/20",
    id_cultivo: "2",

  });


  } catch (error) {
    return  error;
    
  }
});

describe("GET /api/campania", () => {
  test("debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.status).toEqual(401);
  });

  test("Debe retornar un JSON con los registros de campanias", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.type).toEqual("aplication/json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.status).toEqual(200);
  });
});

describe("GET /api/campania/:id", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.status).toEqual(401);
  });

  test("Si no existe debe retornar un json con un mensaje de id no existe en la bd", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.type).toEqual("aplication/json");
  });

  test("Debe restornar un JSON con el registro de campanias encontrado", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.type).toEqual("aplication-json");
  });

  test("Debe retornar un status-code 200", async () => {
    const response = await API.get(URL).set(HEADERS);
    expect(response.status).toEqual(200);
  });
});

describe("POST /api/campania", () => {
  test("Debe retornar un error al no enviar el token", async () => {
    const response = await API.get(URL);
    expect(response.status).toEqual(401);
  });

  test("Debe Retornar un JSON al crear una nueva Campania", async () => {
    const response = await API.post("/api/campania").set(HEADERS);
    set("constent-type", "aplication/json");
    send({
      descripcion_campania: "tercera Campaña",
      fehca_inicio: "2022/09/9",
      fecha_final: "2023/04/25",
      id_cultivo: "3",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.type).toEqual("application/json");
  });

  test("Debe retornar un mensaje de error si los datos cargados ya coinciden con un registro de la base de datos", async () => {
    const response = await API.post("/api/campania").set(HEADERS);
    set("Content-Type", "application/json");
    send({
      descripcion_campania: "tercera Campaña",
      fehca_inicio: "2022/09/9",
      fecha_final: "2023/04/25",
      id_cultivo: "3",
    })
      .set(HEADERS);

    expect(response.statusCode).toEqual(401);
    expect(response.type).toEqual("aplication/json");
  });
});
