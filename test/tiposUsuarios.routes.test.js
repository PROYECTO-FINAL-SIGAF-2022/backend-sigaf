import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { crearUsuarios } from "../helpers/createUser.js";

const API = supertest(app);
const URL = "/api/tipos-usuarios";

const HEADERS = getTokenTest();

beforeAll(async () => {
  await vaciarTablas();

  await crearUsuarios();

  await TiposUsuariosModelo.create({
    descripcion_tipo_usuario: "Administrador",
    rutas_usuario: ["actividades", "usuarios"],
  });
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de tipos de usuarios", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API, {});

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  testFunctionPost(URL, "Debe retornar un error al no enviar el token", {
    descripcion_tipo_usuario: "Administrador",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 401, API);

  testFunctionPost(URL, "Debe retornar un error al crear una actividad con una descripcion existente en la bd", {
    descripcion_tipo_usuario: "Administrador",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al crear una actividad con la descripcion vacia", {
    descripcion_tipo_usuario: "",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al enviar alguna ruta de usuario que no este registrado en el sistema", {
    descripcion_tipo_usuario: "Otro usuario",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campaniass"],
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un nuevo tipo de usuario", {
    descripcion_tipo_usuario: "Persona que ara",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", {
    descripcion_tipo_usuario: "Usuario actualizar 1",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un tipo de usuario con un id inexistente", {
    descripcion_tipo_usuario: "Usuario actualizar 2",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar un tipo de usuario con una descripcion ya existente", {
    descripcion_tipo_usuario: "Administrador",
    rutas_usuario: ["usuarios", "establecimientos", "actividades"],
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/5`, "Actualizar un tipo de usuario con un arreglo de roles ya guardados", {
    descripcion_tipo_usuario: "Administrador2",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias"],
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un tipo de usuario", {
    descripcion_tipo_usuario: "Administrador Actualizar",
    rutas_usuario: ["establecimientos", "actividades", "campanias", "proveedores"],
  }, 200, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar un tipo de usuario con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status 200 al eliminar el tipo de usuario", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
