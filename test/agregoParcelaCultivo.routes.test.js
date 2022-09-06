import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../indexs";
import { AgregoParcelasCultivosModelo } from "../models/AgregoParcelasCultivos.model";

const API = supertest(app);
const URL = "/api/agregarParcelaCultivo";

const HEADERS = {
  Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbVVzdWFyaW8iOnsiaWRfdXN1YXJpbyI6MX0sImlhdCI6MTY2MjMyNjcwNn0.5UXnRCxAz1AiTDQ3gvHOF4XahMw20Dn2gEDTsKhsd1U",
};

// beforeAll(async () => {
//   await vaciarTablas();

//     await AgregoParcelasCultivosModelo.create({

//   })

// });
