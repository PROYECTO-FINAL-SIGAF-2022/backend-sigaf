import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../index";
import { AgregoParcelasCultivosModelo } from "../models/AgregoParcelasCultivos.model";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model";
import { CultivosModelo } from "../models/Cultivos.model";
import { ParcelasModelo } from "../models/Parcelas.model";
import { CampaniasModelo } from "../models/Campanias.model";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { UsuariosModelo } from "../models/Usuarios.model";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model";

const API = supertest(app);
const URL = "/agregar-parcela-cultivos";

const HEADERS = {
  Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbVVzdWFyaW8iOnsiaWRfdXN1YXJpbyI6MX0sImlhdCI6MTY2MjMyNjcwNn0.5UXnRCxAz1AiTDQ3gvHOF4XahMw20Dn2gEDTsKhsd1U",
};

beforeAll(async () => {
  await vaciarTablas();

  try {
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

    await ParcelasModelo.create(
      {
        descripcion_establecimiento: "Establecimiento 1",
        georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
        superficie: "20",
        id_usuario: 1,
      },
    );

    await CultivosModelo.create({
      descripcion_cultivo: "Frutilla",
    });

    await CampaniasModelo.create({
      descripcion_campania: "primer Campaña",
      fecha_inicio: "2022/09/7",
      fecha_final: "2023/04/20",
      id_cultivo: "1",
    });

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Tonelada/s",
    });
    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Metros cuadrados",
    });

    await ParcelasCultivosModelo.create({
      id_parcela: "1",
      id_cultivo: "1",
      id_campania: "1",
      id_unidad_medida: "1",
      cantidad_sembrada: "12",
    });

    await AgregoParcelasCultivosModelo.create({
      id_parcela_cultivo: "1",
      id_unidad_medida: "2",
      cantidad_agregada: "23",
    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API, {}, true);

  testFunctionGet(URL, "Debe retornar un json con los registros de agrego parcelas cultivos", 200, API, HEADERS, true);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS, true);
});

describe(`GET ${URL}/1`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API, {}, true);

  testFunctionGet(`${URL}/3`, "Debe retornar un error si el ID no existe en la bd", 400, API, HEADERS, true);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS, true);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS, true);
});

describe(`POST ${URL}`, () => {
  const sendCrear = {
    id_parcela_cultivo: "1",
    id_unidad_medida: "2",
    cantidad_agregada: "24",

  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", 401, API);
  testFunctionPost(URL, "Debe retornar un error no cargar la cantidad ", {
    id_parcela_cultivo: "1",
    id_unidad_medida: "2",
    cantidad_agregada: "",
  }, 401, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error si el id_parcela_cultivo no exite en la bd", {
    id_parcela_cultivo: "3",
    id_unidad_medida: "2",
    cantidad_agregada: "23",
  }, 400, API, HEADERS);
  testFunctionPost(URL, "Debe retornar un error si el id_unidad_medida no exite en la bd", {
    id_parcela_cultivo: "1",
    id_unidad_medida: "3",
    cantidad_agregada: "23",
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un json con el nuevo registro ", sendCrear, 200, API, HEADERS);
});

describe(` PUT ${URL}/1`, () => {
  const sendActualizar = {
    id_parcela_cultivo: "1",
    id_unidad_medida: "2",
    cantidad_agregada: "230",
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", sendActualizar, 401, API);

  testFunctionPut(`${URL}/4`, "Debe retornar un error si el id no existe en la bd ", sendActualizar, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el id_parcela_cultivo no existe en la bd ", {
    id_parcela_cultivo: "3",
    id_unidad_medida: "2",
    cantidad_agregada: "230",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el id_unidad_medida no existe en la bd ", {
    id_parcela_cultivo: "1",
    id_unidad_medida: "4",
    cantidad_agregada: "230",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/4`, "Debe retornar un error si no ingresa la cantidad agregada", {
    id_parcela_cultivo: "1",
    id_unidad_medida: "4",
    cantidad_agregada: "",
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un json al actualizar el registro", sendActualizar, 200, API, HEADERS);
});

describe(`DELETE ${URL}/1`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/2`, "Debe retornar un error si el id no existe en la bd", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200 si se elimino el registro", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  await server.close();
});
