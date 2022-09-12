import supertest from "supertest";
// import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionPost,
} from "../helpers/tests/testFunctions";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

const API = supertest(app);
const URL = "/login";

// const HEADERS = getTokenTest();

beforeAll(async () => {
  await vaciarTablas();

  await TiposUsuariosModelo.create({ descripcion_tipo_usuario: "Administrador" });
  await UsuariosModelo.create({
    nombre_persona: "Nombre Usuario",
    apellido_persona: "Apellido Usuario",
    dni_persona: "43711023",
    fecha_nac_persona: "2001/09/01",
    email_persona: "correo@gmail.com",
    telefono_persona: "3704871212",
    username_usuario: "usuariodev",
    password_usuario: "123456",
    id_tipo_usuario: "1",
  });
});
describe(`POST ${URL}`, () => {
  testFunctionPost(URL, "Debe retornar un token de autenticacion", {
    username_usuario: "usuariodev",
    password_usuario: "123456",
  }, 200, API, true);

//   testFunctionPost(URL, "Crear una actividad", {
//     descripcion_actividad: "Plantar",
//   }, 201, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
