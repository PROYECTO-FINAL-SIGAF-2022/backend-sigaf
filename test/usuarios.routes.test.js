import supertest from "supertest";
import { crearUsuarios } from "../helpers/createUser.js";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";
import {testFunctionGet, testFunctionPost, testFunctionDelete, testFunctionPut} from "../helpers/tests/testFunctions";


const API = supertest(app);

const URL = "/api/usuarios";




beforeAll(async () => {
  try {

    await vaciarTablas();
    await crearUsuarios();
  } catch (error) {
    // console.log(error);
  }
});

// describe(`GET ${URL}`, () => {
// testFunctionGet(URL, "Debe retornar un json con los registros", 200, API);
// testFunctionGet(URL, "Debe retornar un status-code 200", 200, API);

// });

 describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un json", 200, API,{},true);
  // test("Debe retornar un json", async () => {
  //   const response = await API.get(`${URL}/1`);
  //   // console.log(response.body);
  //   expect(response.type).toEqual("application/json");
  // });
  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API,{},true);

  // test("Debe retornar un status-code 200", async () => {
  //   const response = await API.get(`${URL}/1`);
  //   expect(response.statusCode).toEqual(200);
  // });

  testFunctionGet(`${URL}/12345`, "Si no existe deve retornar un status-code 404", 404, API,{},true);


  // test("Si no existe deve retornar un status-code 404", async () => {
  //   const response = await API.get(`${URL}/12345`);
  //   expect(response.statusCode).toEqual(404);
  // });

  testFunctionGet(`${URL}/12345`, "Si no existe deve retornar texto plano", 400, API,{},true);


  // test("Si no existe deve retornar texto plano", async () => {
  //   const response = await API.get(`${URL}/12345`);
  //   expect(response.type).toEqual("text/plain");
  // });
});

// describe(`POST ${URL}`, () => {
//   test("Crear un usuario", async () => {
//     const response = await API.post(URL)
//       .set("Content-Type", "application/json")
//       .send(generarNuevoUsuario());
//     expect(response.statusCode).toEqual(201);
//     expect(response.type).toEqual("application/json");
//   });

//   test("Crear un usuario con datos ya existentes", async () => {
//     const equalUser = generarNuevoUsuario();

//     await API.post(URL)
//       .set("Content-Type", "application/json")
//       .send(equalUser);

//     const userTwo = await API.post(URL)
//       .set("Content-Type", "application/json")
//       .send(equalUser);
//     expect(userTwo.statusCode).toEqual(406);
//   });

//   test("Crear un usuarios sin todos los datos", async () => {
//     const { username_usuario, password_usuario, ...restOfTestUser } = generarNuevoUsuario();
//     const usuarioSinTodosLosDatos = restOfTestUser;

//     const response = await API.post(URL)
//       .set("Content-Type", "application/json")
//       .send(usuarioSinTodosLosDatos);

//     expect(response.statusCode).toEqual(406);
//   });
// });

// describe(`PUT ${URL}/:id`, () => {
//   test("Actualizar un usuario", async () => {
//     const response = await API.put(`${URL}/1`)
//       .set("Content-Type", "application/json")
//       .send({
//         username_usuario: "nuevo_username",
//         password_usuario: "nuevo_password",
//       });
//     expect(response.statusCode).toEqual(200);
//     expect(response.type).toEqual("application/json");
//   });

//   // TODO: "Actualizar un usuario con datos ya existentes"

//   // test("Actualizar un usuario con datos ya existentes", async () => {
//   //   const equalUser = generarNuevoUsuario();

//   //   await API.post(URL)
//   //     .set("Content-Type", "application/json")
//   //     .send(equalUser);

//   //   const userTwo = await API.put(URL)
//   //     .set("Content-Type", "application/json")
//   //     .send(equalUser);
//   //   expect(userTwo.statusCode).toEqual(406);
//   // });
// });

afterAll(async () => {
  await vaciarTablas();
  server.close();
});
