import supertest from "supertest";
import { crearUsuarios } from "../helpers/createUser.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import { getTokenTest } from "../helpers/getToken.js";
import {
  testFunctionGet, testFunctionPost, testFunctionDelete, testFunctionPut,
} from "../helpers/tests/testFunctions";

const API = supertest(app);

const URL = "/api/usuarios";

const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();
    await crearUsuarios();
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);
  testFunctionGet(URL, "Debe retornar un json con los registros", 200, API, HEADERS);
  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);
  testFunctionGet(`${URL}/1`, "Debe retornar un json", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/40`, "Si no existe deve retornar un status-code 400", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const nuevoUsuario = {
    nombre_persona: "marcos",
    apellido_persona: "franco",
    dni_persona: 441017905,
    fecha_nac_persona: "2022-08-27T14:24:15.525Z",
    email_persona: "test2@gmail.com",
    telefono_persona: 3704234234,
    username_usuario: "tester3",
    password_usuario: "tester3",
    id_tipo_usuario: "1",
  };

  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionPost(URL, "Crear un usuario", nuevoUsuario, 201, API, HEADERS);

  testFunctionPost(URL, "Crear un usuario con datos ya existentes", nuevoUsuario, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un usuarios sin todos los datos", {
    nombre_persona: "",
    apellido_persona: "",
    dni_persona: "",
    fecha_nac_persona: "",
    email_persona: "",
    telefono_persona: "",
    username_usuario: "",
    password_usuario: "",
    id_tipo_usuario: "",
  }, 400, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const actualizarUsuario = {
    nombre_persona: "marcos",
    apellido_persona: "junior",
    dni_persona: 441017906,
    fecha_nac_persona: "2022-08-27",
    email_persona: "test2@gmail.com",
    telefono_persona: 3704234234,
    username_usuario: "tester34",
    password_usuario: "tester34",
    id_tipo_usuario: "1",
  };

  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionPut(`${URL}/2`, "Actualizar un usuario", actualizarUsuario, 200, API, HEADERS);

  testFunctionPut(`${URL}/2`, "Actualizar un usuario con datos ya existentes", {
    nombre_persona: "Nombre Usuario",
    apellido_persona: "Apellido Usuario",
    dni_persona: "43711023",
    fecha_nac_persona: "2001/09/01",
    email_persona: "correo@gmail.com",
    telefono_persona: "3704871212",
    username_usuario: "usuariodev",
    password_usuario: "123456",
    id_tipo_usuario: "1",
  }, 400, API, HEADERS);
});

describe(`DELETE ${URL}/1`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);
  testFunctionDelete(`${URL}/1`, "Debe retornar un error si el ID no se encuentra en la bd", 400, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
