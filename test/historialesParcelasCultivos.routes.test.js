import supertest from "supertest";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { crearUsuarios } from "../helpers/createUser.js";
import { app, server } from "../index.js";
import { HistorialesParcelasCultivosModelo } from "../models/HistorialesParcelasCultivos.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { ActividadesModelo } from "../models/Actividades.model.js";
import { ProductosModelo } from "../models/Productos.model.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";
import { getTokenTest } from "../helpers/getToken";
import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions.js";

const API = supertest(app);
const URL = "/api/historiales";
const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    await vaciarTablas();
    await crearUsuarios();

    await EstablecimientosModelo.create({
      descripcion_establecimiento: "PyFsa",
      georeferencia: "-34.6037,-58.3811",
      superficie: " 100",
      id_usuario: 1,
    });

    await ParcelasModelo.create({
      georeferencia: " -34.6037,-58.3812",
      superficie: " 70",
      id_establecimiento: "1",
    });

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Toneladas",
    });

    await CultivosModelo.create({
      descripcion_cultivo: "Tomate",
    });

    await ProveedoresModelo.create({
      nombre_proveedor: "proveedor 1",
      telefono_proveedor: "3704981212",
      direccion_proveedor: "Avenida siempre viva",
    });

    await TiposProductosModelo.create({
      descripcion_tipo_producto: "Estiercol",
    });

    await ProductosModelo.create({
      descripcion_producto: "Fertilizantes",
      fecha_vencimiento_producto: "2020/10/10",
      cantidad_producto: "10",
      id_proveedor: 1,
      id_tipo_producto: 1,
      id_usuario: 1,
      id_unidad_medida: 1,
    });

    await ActividadesModelo.create({
      descripcion_actividad: "Cosechar",
    });

    await CampaniasModelo.create({
      descripcion_campania: "La super campaña de maiz",
      fecha_inicio: "2020/10/10",
      fecha_final: "2021/10/21",
      id_cultivo: 1,
    });

    await ParcelasCultivosModelo.create({
      id_parcela: 1,
      id_cultivo: "1",
      id_campania: "1",
      id_unidad_medida: "1",
      cantidad_sembrada: "23131",
    });

    await HistorialesParcelasCultivosModelo.create({
      id_parcela_cultivo: "1",
      id_actividad: "1",
      id_usuario: "1",
      cantidad_uso_producto: "5",
      id_producto: 1,
      activo: true,
    });
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
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const sendHistorial = {
    id_parcela_cultivo: "1",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", sendHistorial, 401, API);

  testFunctionPost(URL, "Debe retornar un error si el ID de parcela cultivo no existe", {
    id_parcela_cultivo: "40",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error si el ID de actividad no existe", {
    id_parcela_cultivo: "1",
    id_actividad: "14",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error si el ID de usuario no existe", {
    id_parcela_cultivo: "1",
    id_actividad: "14",
    id_usuario: "20",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error si el ID de producto no existe", {
    id_parcela_cultivo: "1",
    id_actividad: "14",
    id_usuario: "20",
    cantidad_uso_producto: "2",
    id_producto: "34",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Debe retornar un error al no rellenar el campo cantidad de uso", {
    id_parcela_cultivo: "1",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un Historial", sendHistorial, 200, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const sendActualizar = {
    id_parcela_cultivo: "1",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "12",
    id_producto: "1",
    activo: true,
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", sendActualizar, 401, API);

  testFunctionPut(`${URL}/30`, "Debe retornar un error si el ID de historial no existe", {
    id_parcela_cultivo: "40",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el ID de parcela cultivo no existe", {
    id_parcela_cultivo: "40",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el ID de actividad no existe", {
    id_parcela_cultivo: "1",
    id_actividad: "14",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el ID de usuario no existe", {
    id_parcela_cultivo: "1",
    id_actividad: "14",
    id_usuario: "20",
    cantidad_uso_producto: "2",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error si el ID de producto no existe", {
    id_parcela_cultivo: "1",
    id_actividad: "14",
    id_usuario: "20",
    cantidad_uso_producto: "2",
    id_producto: "34",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no rellenar el campo cantidad de uso", {
    id_parcela_cultivo: "1",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "",
    id_producto: "1",
    activo: true,
  }, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un Historial", sendActualizar, 200, API, HEADERS);
});

describe(`${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);
  testFunctionDelete(`${URL}/12`, "Debe retornar un error si el ID no existe", 400, API, HEADERS);
  testFunctionDelete(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

afterAll(async () => {
  await vaciarTablas();
  await server.close();
});
