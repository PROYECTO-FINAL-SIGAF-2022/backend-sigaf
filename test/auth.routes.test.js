import bcrypt from "bcryptjs";
import supertest from "supertest";
// import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionPost,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";

const API = supertest(app);
const URL = "/api";

// const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();

    await crearUsuarios();
  } catch (error) {
    console.log(error);
  }
});
describe(`POST AUTENTIFICAR ${URL}/login`, () => {
  testFunctionPost(`${URL}/login`, "Debe retornar un 401 si no se envia el nombre de usuario", {
    username_usuario: "",
    password_usuario: "12345",
  }, 400, API, {});

  testFunctionPost(`${URL}/login`, "Debe retornar un 401 si no se envia la contraseña de usuario", {
    username_usuario: "usuariodev",
    password_usuario: "",
  }, 400, API, {});

  testFunctionPost(`${URL}/login`, "Debe retornar un 401 si las credenciales son incorrectas", {
    username_usuario: "usuariodev",
    password_usuario: "12345",
  }, 401, API, {});

  testFunctionPost(`${URL}/login`, "Debe retornar un token de autenticacion con un status code 200", {
    username_usuario: "usuariodev",
    password_usuario: "123456",
  }, 200, API, {});
});

describe(`POST REGISTRAR ${URL}`, () => {
  const personaRegistrar = {
    nombre_persona: "Nombre Usuario",
    apellido_persona: "Apellido Usuario",
    dni_persona: "43711025",
    fecha_nac_persona: "2001/09/01",
    email_persona: "correo@gmail.com",
    telefono_persona: "3704871212",
    username_usuario: "usuariodevprueba",
    password_usuario: "123456",
  };

  const usuarioSinNombre = { ...personaRegistrar };
  usuarioSinNombre.nombre_persona = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia el nombre de la persona", usuarioSinNombre, 400, API, {});

  const usuarioSinApellido = { ...personaRegistrar };
  usuarioSinApellido.apellido_persona = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia el apellido de la persona", usuarioSinApellido, 400, API, {});

  const usuarioSinDni = { ...personaRegistrar };
  usuarioSinDni.dni_persona = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia el dni de la persona", usuarioSinDni, 400, API, {});

  const usuarioConDniRepetido = { ...personaRegistrar };
  usuarioConDniRepetido.dni_persona = "43711023";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si se envia un dni ya guardado en la db", usuarioConDniRepetido, 400, API, {});

  const usuarioConDniIncompleto = { ...personaRegistrar };
  usuarioConDniIncompleto.dni_persona = "4371102";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si se envia un dni con una longitud menor a 8 numeros", usuarioConDniIncompleto, 400, API, {});

  const usuarioSinFechaNac = { ...personaRegistrar };
  usuarioSinFechaNac.dni_persona = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia la fecha de nacimiento de la persona", usuarioSinFechaNac, 400, API, {});

  const usuarioSinCorreo = { ...personaRegistrar };
  usuarioSinCorreo.email_persona = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia el correo de la persona", usuarioSinCorreo, 400, API, {});

  const usuarioConCorreoInvalido = { ...personaRegistrar };
  usuarioConCorreoInvalido.email_persona = "dasdsasdagmail.com";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si se envia un correo invalido", usuarioConCorreoInvalido, 400, API, {});

  const usuarioSinTelefono = { ...personaRegistrar };
  usuarioSinTelefono.telefono_persona = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia un numero de telefono", usuarioSinTelefono, 400, API, {});

  const usuarioConTelefonoIncompleto = { ...personaRegistrar };
  usuarioConTelefonoIncompleto.telefono_persona = "370491122";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia un numero de telefono completo", usuarioConTelefonoIncompleto, 400, API, {});

  const usuarioSinUserName = { ...personaRegistrar };
  usuarioSinUserName.username_usuario = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia un nombre de usuario", usuarioSinUserName, 400, API, {});

  const usuarioConUserNameRegistrado = { ...personaRegistrar };
  usuarioConUserNameRegistrado.username_usuario = "usuariodev";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si se envia un nombre de usuario ya registrado", usuarioConUserNameRegistrado, 400, API, {});

  const usuarioSinPassword = { ...personaRegistrar };
  usuarioSinPassword.password_usuario = "";
  testFunctionPost(`${URL}/registrarse`, "Debe retornar un 401 si no se envia una contraseña", usuarioSinPassword, 400, API, {});

  testFunctionPost(`${URL}/registrarse`, "Debe retornar un status code 200 si el usuario se registra de forma exitosa", personaRegistrar, 200, API, {});

  testFunctionPost(`${URL}/login`, "Debe retornar un token de autenticacion con un status code 200", {
    username_usuario: "usuariodevprueba",
    password_usuario: "123456",
  }, 200, API, {});
});

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
