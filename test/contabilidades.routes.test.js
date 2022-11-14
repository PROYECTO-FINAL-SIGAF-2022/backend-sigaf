// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import bcrypt from "bcryptjs";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";
import { ContabilidadModelo } from "../models/Contabilidad.model.js";

const API = supertest(app);
const URL = "/api/contabilidad";

const HEADERS = getTokenTest();

beforeAll(async () => {
  jest.setTimeout(10000);
  try {
    await vaciarTablas();
    await crearUsuarios();

    await TiposUsuariosModelo.create({ descripcion_tipo_usuario: "Administrador", rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias", "cultivos", "historiales", "parcelas", "parcelas-cultivos", "tipos-usuarios", "detalle-campanias", "tipo-productos", "agregar-parcela-cultivos", "proveedores", "unidades-medidas", "productos", "perdidas-parcelas-cultivos", "establecimientos-usuarios", "verificar-token-establecimiento-usuario", "establecimiento-usuario", "almacenes", "almacenes-vender", "maquinas", "maquinas-vender", "empleados-parcelas-cultivos", "cosechas-campania-parcelas", "contabilidad-cosechas", "maquinas-vendidas", "parcelas-cultivos-by-parcela"] });

    await UsuariosModelo.create({
      nombre_persona: "Nombre Usuario",
      apellido_persona: "Apellido Usuario",
      dni_persona: "43711021",
      fecha_nac_persona: "2001/09/01",
      email_persona: "correo2@gmail.com",
      telefono_persona: "3704871214",
      username_usuario: "usuariodevdas",
      password_usuario: bcrypt.hashSync("123456", 10),
      id_tipo_usuario: "1",
    });

    await EstablecimientosModelo.create({
      descripcion_establecimiento: "Establecimiento 1",
      georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
      superficie: "20",
      id_usuario: 1,
    });

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Kilogramos",
      id_establecimiento: "1",
    });

    await CultivosModelo.create({
      descripcion_cultivo: "Maiz",
      id_establecimiento: "1",
      activo: true,
    });

    await CampaniasModelo.create({
      descripcion_campania: "La super campaña de maiz",
      fecha_inicio: "2020/10/10",
      fecha_final: "2021/10/21",
      id_cultivo: 1,
      activo: true,
      id_establecimiento: 1,
    });

    await ParcelasModelo.create({
      georeferencia: "[[-26.079517678909262, -58.278075533770604],[-26.078284684309523, -58.278075533770604],[-26.078284684309523, -58.27627214275794],[-26.079517678909262, -58.27627214275794]]",
      superficie: " 70",
      id_establecimiento: "1",
      activo: true,
    });

    await ParcelasCultivosModelo.create({
      id_parcela: "1",
      id_cultivo: "1",
      id_campania: "1",
      id_unidad_medida: "1",
      cantidad_sembrada: "23131",
      activo: true,
      id_establecimiento: "1",
    });

    await ContabilidadModelo.create({
      descripcion_contabilidad: "Venta de 1000 kg de algodon",
      observacion_contabilidad: "",
      monto_contabilidad: "30000",
      tipo_contabilidad: "ingreso",
      id_parcela_cultivo: "1",
      id_establecimiento: "1",
    });

    await ContabilidadModelo.create({
      descripcion_contabilidad: "Gasto de 20 litros de combustible",
      observacion_contabilidad: "",
      monto_contabilidad: "egreso",
      id_parcela_cultivo: "1",
      id_establecimiento: "1",
    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de contabilidad", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const nuevoRegistroContabilidad = {
    descripcion_contabilidad: "Gasto de 40 litros de combustible",
    observacion_contabilidad: "-",
    tipo_contabilidad: "egreso",
    monto_contabilidad: "30000",
    id_parcela_cultivo: "1",
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", nuevoRegistroContabilidad, 401, API);

  const contabilidadSinDescripcion = { ...nuevoRegistroContabilidad };
  contabilidadSinDescripcion.descripcion_contabilidad = "";

  testFunctionPost(URL, "Debe retornar un error al intentar crear una registro de contabilidad con descripcion que este vacio", contabilidadSinDescripcion, 400, API, HEADERS);

  const contabilidadConObervacionInvalida = { ...nuevoRegistroContabilidad };
  contabilidadConObervacionInvalida.observacion_contabilidad = "";

  testFunctionPost(URL, "Debe retornar un error al intentar crear una registro de contabilidad con una observacion que no se encuentre en la bd", contabilidadConObervacionInvalida, 400, API, HEADERS);

  const contabilidadConUnMontoInvalido = { ...nuevoRegistroContabilidad };
  contabilidadConUnMontoInvalido.monto_contabilidad = "";

  testFunctionPost(URL, "Debe retornar un error al intentar crear un registro de contabilidad con un monto invalido", contabilidadConUnMontoInvalido, 400, API, HEADERS);

  const contabilidadConUnTipoContabilidadInvalido = { ...nuevoRegistroContabilidad };
  contabilidadConUnTipoContabilidadInvalido.tipo_contabilidad = "";

  testFunctionPost(URL, "Debe retornar un error al intentar crear un registro de contabilidad con un tipo invalido", contabilidadConUnTipoContabilidadInvalido, 400, API, HEADERS);

  const contabilidadConIdParcelaCultivoInvalido = { ...nuevoRegistroContabilidad };
  contabilidadConIdParcelaCultivoInvalido.id_parcela_cultivo = "";
  testFunctionPost(URL, "Debe retornar un error al intentar crear un registro de contabilidad con un id de parcela cultivo invalido", contabilidadConIdParcelaCultivoInvalido, 400, API, HEADERS);

  testFunctionPost(URL, "Crear un registro de contabilidad exitoso", nuevoRegistroContabilidad, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const actualizaRegistroContabilidad = {
    descripcion_contabilidad: "Venta de 1 tonelada de maiz",
    observacion_contabilidad: "-",
    tipo_contabilidad: "ingreso",
    monto_contabilidad: "50000",
    id_parcela_cultivo: "1",
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", actualizaRegistroContabilidad, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un almacen con un id inexistente", actualizaRegistroContabilidad, 400, API, HEADERS);

  const contabilidadSinDescripcion = { ...actualizaRegistroContabilidad };
  contabilidadSinDescripcion.descripcion_contabilidad = "";

  testFunctionPut(`${URL}/1`, "Debe retornar un error al intentar crear una registro de contabilidad con descripcion que este vacio", contabilidadSinDescripcion, 400, API, HEADERS);

  const contabilidadConObervacionInvalida = { ...actualizaRegistroContabilidad };
  contabilidadConObervacionInvalida.observacion_contabilidad = "";

  testFunctionPut(`${URL}/1`, "Debe retornar un error al intentar crear una registro de contabilidad con una observacion que no se encuentre en la bd", contabilidadConObervacionInvalida, 400, API, HEADERS);

  const contabilidadConUnMontoInvalido = { ...actualizaRegistroContabilidad };
  contabilidadConUnMontoInvalido.monto_contabilidad = "";

  testFunctionPut(`${URL}/1`, "Debe retornar un error al intentar crear un registro de contabilidad con un monto invalido", contabilidadConUnMontoInvalido, 400, API, HEADERS);

  const contabilidadConUnTipoContabilidadInvalido = { ...actualizaRegistroContabilidad };
  contabilidadConUnTipoContabilidadInvalido.tipo_contabilidad = "";

  testFunctionPut(`${URL}/1`, "Debe retornar un error al intentar crear un registro de contabilidad con un tipo invalido", contabilidadConUnTipoContabilidadInvalido, 400, API, HEADERS);

  const contabilidadConIdParcelaCultivoInvalido = { ...actualizaRegistroContabilidad };
  contabilidadConIdParcelaCultivoInvalido.id_parcela_cultivo = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al intentar crear un registro de contabilidad con un id de parcela cultivo invalido", contabilidadConIdParcelaCultivoInvalido, 400, API, HEADERS);

  testFunctionPut(`${URL}/1`, "Actualizar un empleado parcela cultivo", actualizaRegistroContabilidad, 200, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar un registro de contabilidad con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Eliminar un registro de contabilidad correctamente", 200, API, HEADERS);
});

// describe("PUT VENDER MAQUINA /api/maquinas/:id", () => {
//   const venderMaquina = {
//     precio_venta_maquina: "2022/11/04",
//     fecha_venta_maquina: "90000",
//   };

//   testFunctionPut("/api/maquinas-vender/1", "Debe retornar un error al no enviar el token", venderMaquina, 401, API);

//   testFunctionPut("/api/maquinas-vender/5", "Actualizar una maquina con un id inexistente", venderMaquina, 400, API, HEADERS);

//   const maquinaPrevioVentaInvalido = { ...venderMaquina };
//   maquinaPrevioVentaInvalido.precio_venta_maquina = "";
//   testFunctionPut("/api/maquinas-vender/1", "Debe retornar un error al vender una maquina con el tipo de precio venta", maquinaPrevioVentaInvalido, 400, API, HEADERS);

//   const maquinaFechaVentaInvalido = { ...venderMaquina };
//   maquinaFechaVentaInvalido.fecha_venta_maquina = "";
//   testFunctionPut("/api/maquinas-vender/1", "Debe retornar un error al vender una maquina con la fecha de venta invalida", maquinaFechaVentaInvalido, 400, API, HEADERS);

//   testFunctionPut("/api/maquinas-vender/1", "Vender una maquina", venderMaquina, 200, API, HEADERS);
// });

afterAll(async () => {
  // jest.setTimeout(10000);
  // await vaciarTablas();
  await server.close();
});
