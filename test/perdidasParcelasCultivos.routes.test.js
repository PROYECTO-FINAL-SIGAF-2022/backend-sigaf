import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas";
import { app, server } from "../index";
import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser";

const API = supertest(app);
const URL = "/api/perdidas-parcelas-cultivos";

const HEADERS = {
  Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbVVzdWFyaW8iOnsiaWRfdXN1YXJpbyI6MX0sImlhdCI6MTY2MjMyNjcwNn0.5UXnRCxAz1AiTDQ3gvHOF4XahMw20Dn2gEDTsKhsd1U",
};

beforeAll(async () => {
  try {
    await vaciarTablas();
    await crearUsuarios();

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

    await PerdidasParcelasCultivosModelo.create({
      id_parcela_cultivo: "1",
      id_unidad_medida: "1",
      cantidad_perdida: "20",
    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de perdida parcelas cultivos", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/1`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/3`, "Debe retornar un error si el ID no existe en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const perdidaCrear = {
    id_parcela_cultivo: "1",
    id_unidad_medida: "1",
    cantidad_perdida: "24",
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", perdidaCrear, 401, API);

  const perdidaSinCantidad = { ...perdidaCrear };
  perdidaSinCantidad.cantidad_perdida = "";
  testFunctionPost(URL, "Debe retornar un error no cargar la cantidad ", perdidaSinCantidad, 400, API, HEADERS);

  const perdidaSinIdParcelCultivo = { ...perdidaCrear };
  perdidaSinIdParcelCultivo.id_parcela_cultivo = 0;
  testFunctionPost(URL, "Debe retornar un error si el id_parcela_cultivo no exite en la bd", perdidaSinIdParcelCultivo, 400, API, HEADERS);

  const perdidaSinIdUnidadMedida = { ...perdidaCrear };
  perdidaSinIdUnidadMedida.id_unidad_medida = 0;
  testFunctionPost(URL, "Debe retornar un error si el id_unidad_medida no exite en la bd", perdidaSinIdUnidadMedida, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un json con el nuevo registro ", perdidaCrear, 201, API, HEADERS);
});

describe(` PUT ${URL}/1`, () => {
  const perdidaActualizar = {
    id_parcela_cultivo: "1",
    id_unidad_medida: "1",
    cantidad_perdida: "270",
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", perdidaActualizar, 401, API);

  testFunctionPut(`${URL}/4`, "Debe retornar un error si el id no existe en la bd ", perdidaActualizar, 400, API, HEADERS);

  const perdidaSinCantidad = { ...perdidaActualizar };
  perdidaSinCantidad.cantidad_perdida = "";
  testFunctionPost(URL, "Debe retornar un error no cargar la cantidad ", perdidaSinCantidad, 400, API, HEADERS);

  const perdidaSinIdParcelCultivo = { ...perdidaActualizar };
  perdidaSinIdParcelCultivo.id_parcela_cultivo = 0;
  testFunctionPost(URL, "Debe retornar un error si el id_parcela_cultivo no exite en la bd", perdidaSinIdParcelCultivo, 400, API, HEADERS);

  const perdidaSinIdUnidadMedida = { ...perdidaActualizar };
  perdidaSinIdUnidadMedida.id_unidad_medida = 0;
  testFunctionPost(URL, "Debe retornar un error si el id_unidad_medida no exite en la bd", perdidaSinIdUnidadMedida, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un json al actualizar el registro", perdidaActualizar, 200, API, HEADERS);
});

describe(`DELETE ${URL}/1`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/6`, "Debe retornar un error si el id no existe en la bd", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200 si se elimino el registro de perdida parcela cultivo", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  await server.close();
});
