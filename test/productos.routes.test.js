// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from "@jest/globals";
import supertest from "supertest";
import { getTokenTest } from "../helpers/getToken.js";
import { vaciarTablas } from "../helpers/vaciarTablas.js";
import { app, server } from "../index.js";

import {
  testFunctionGet, testFunctionPost, testFunctionPut, testFunctionDelete,
} from "../helpers/tests/testFunctions";
import { crearUsuarios } from "../helpers/createUser.js";
import { ProductosModelo } from "../models/Productos.model.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";

const API = supertest(app);
const URL = "/api/productos";

const HEADERS = getTokenTest();

beforeAll(async () => {
  try {
    jest.setTimeout(10000);
    await vaciarTablas();

    await crearUsuarios();

    await EstablecimientosModelo.create({
      descripcion_establecimiento: "Establecimiento 1",
      georeferencia: "[[[17.385044, 78.486671], [16.506174, 80.648015], [17.686816, 83.218482]],[[13.082680, 80.270718], [12.971599, 77.594563],[15.828126, 78.037279]]]",
      superficie: "20",
      id_usuario: 1,
    });

    await ProveedoresModelo.create({
      nombre_proveedor: "Proveedor 1",
      telefono_proveedor: "3704871212",
      direccion_proveedor: "Direccion proveedor 1",
      id_establecimiento: "1",
    });

    await TiposProductosModelo.create({
      descripcion_tipo_producto: "Comestibles",
      id_establecimiento: "1",
    });

    await UnidadesMedidasModelo.create({
      descripcion_unidad_medida: "Kilogramos",
      id_establecimiento: "1",
    });

    await ProductosModelo.create({

      descripcion_producto: "Producto 1",
      fecha_vencimiento_producto: "2022/09/18",
      cantidad_producto: 20,
      precio_producto: 50,
      id_proveedor: 1,
      id_tipo_producto: 1,
      id_usuario: 1,
      id_unidad_medida: 1,
      id_establecimiento: 1,
    });

    await ProductosModelo.create({

      descripcion_producto: "Producto 2",
      fecha_vencimiento_producto: "2021/09/18",
      cantidad_producto: 21,
      precio_producto: 70,
      id_proveedor: 1,
      id_tipo_producto: 1,
      id_usuario: 1,
      id_unidad_medida: 1,
      id_establecimiento: 1,
    });
  } catch (error) {
    console.log(error);
  }
});

describe(`GET ${URL}`, () => {
  testFunctionGet(URL, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionGet(URL, "Debe retornar un json con los registros de productos", 200, API, HEADERS);

  testFunctionGet(URL, "Debe retornar un status-code 200", 200, API, HEADERS);
});

describe(`GET ${URL}/:id`, () => {
  testFunctionGet(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API, {});

  testFunctionGet(`${URL}/1`, "Debe retornar un json con el registro encontrado", 200, API, HEADERS);

  testFunctionGet(`${URL}/1`, "Debe retornar un status-code 200", 200, API, HEADERS);

  testFunctionGet(`${URL}/12`, "Si no existe debe retornar un json con un mensaje de id no existe en la bd", 400, API, HEADERS);
});

describe(`POST ${URL}`, () => {
  const productoRegistrar = {
    descripcion_producto: "Producto 1",
    fecha_vencimiento_producto: "2022/09/18",
    cantidad_producto: 20,
    precio_producto: 10000,
    id_proveedor: 1,
    id_tipo_producto: 1,
    id_usuario: 1,
    id_unidad_medida: 1,
  };

  testFunctionPost(URL, "Debe retornar un error al no enviar el token", productoRegistrar, 401, API);

  const productoConDescripcionDuplicada = { ...productoRegistrar };

  testFunctionPost(URL, "Debe retornar un error al crear una producto con una descripcion existente en la bd", productoConDescripcionDuplicada, 400, API, HEADERS);

  const productoConDescripcionVacia = { ...productoRegistrar };
  productoConDescripcionVacia.descripcion_producto = "";
  testFunctionPost(URL, "Debe retornar un error al crear un producto con la descripcion vacia", productoConDescripcionVacia, 400, API, HEADERS);

  const productoConFechaVacia = { ...productoRegistrar };
  productoConFechaVacia.fecha_vencimiento_producto = "";
  productoConFechaVacia.descripcion_producto = "Producto sin fecha";
  testFunctionPost(URL, "Debe retornar un error al crear una producto con la fecha vacia", productoConFechaVacia, 400, API, HEADERS);

  const productoConCantidadVacia = { ...productoRegistrar };
  productoConCantidadVacia.cantidad_producto = "";
  testFunctionPost(URL, "Debe retornar un error al enviar un string vacio", productoConCantidadVacia, 400, API, HEADERS);

  const productoConCantidad0 = { ...productoRegistrar };
  productoConCantidad0.cantidad_producto = 0;
  testFunctionPost(URL, "Debe retornar un error al crear un producto con la cantidad igual a 0", productoConCantidad0, 400, API, HEADERS);

  const productoSinIdProveedor = { ...productoRegistrar };
  productoSinIdProveedor.id_proveedor = 0;
  testFunctionPost(URL, "Debe retornar un error al crear un producto con id_proveedor no existente en la bd", productoSinIdProveedor, 400, API, HEADERS);

  const productoSinIdTipoProducto = { ...productoRegistrar };
  productoSinIdTipoProducto.id_tipo_producto = 0;
  testFunctionPost(URL, "Debe retornar un error al crear un producto con id_tipo_producto no existente en la bd", productoSinIdTipoProducto, 400, API, HEADERS);

  const productoSinIdUsuario = { ...productoRegistrar };
  productoSinIdUsuario.id_usuario = 0;
  testFunctionPost(URL, "Debe retornar un error al crear un producto con un id_usuario no existente en la bd", productoSinIdUsuario, 400, API, HEADERS);

  const productoSinIdUnidadMedida = { ...productoRegistrar };
  productoSinIdUnidadMedida.id_unidad_medida = 0;
  testFunctionPost(URL, "Debe retornar un error al crear un producto con un id_unidad_medida no existente en la bd", productoSinIdUnidadMedida, 400, API, HEADERS);

  const productoNuevo = { ...productoRegistrar };
  productoNuevo.descripcion_producto = "Producto nuevo 3";

  testFunctionPost(URL, "Crear un nuevo producto", productoNuevo, 201, API, HEADERS);
});

describe(`PUT ${URL}/:id`, () => {
  const productoEditar = {
    descripcion_producto: "Producto 1",
    fecha_vencimiento_producto: "2022/09/18",
    cantidad_producto: 20,
    precio_producto: 20000,
    id_proveedor: 1,
    id_tipo_producto: 1,
    id_usuario: 1,
    id_unidad_medida: 1,
  };

  testFunctionPut(`${URL}/1`, "Debe retornar un error al no enviar el token", productoEditar, 401, API);

  testFunctionPut(`${URL}/5`, "Actualizar un un producto con un id inexistente", productoEditar, 400, API, HEADERS);

  const productoConDescripcionDuplicada = { ...productoEditar };
  productoConDescripcionDuplicada.descripcion_producto = "Producto 2";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al editar una producto con una descripcion existente en la bd", productoConDescripcionDuplicada, 400, API, HEADERS);

  const productoConDescripcionVacia = { ...productoEditar };
  productoConDescripcionVacia.descripcion_producto = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear un producto con la descripcion vacia", productoConDescripcionVacia, 400, API, HEADERS);

  const productoConFechaVacia = { ...productoEditar };
  productoConFechaVacia.fecha_vencimiento_producto = "";
  productoConFechaVacia.descripcion_producto = "Producto sin fecha";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear una producto con la fecha vacia", productoConFechaVacia, 400, API, HEADERS);

  const productoConCantidadVacia = { ...productoEditar };
  productoConCantidadVacia.cantidad_producto = "";
  testFunctionPut(`${URL}/1`, "Debe retornar un error al enviar un string vacio", productoConCantidadVacia, 400, API, HEADERS);

  const productoConCantidad0 = { ...productoEditar };
  productoConCantidad0.cantidad_producto = 0;
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear un producto con la cantidad igual a 0", productoConCantidad0, 400, API, HEADERS);

  const productoSinIdProveedor = { ...productoEditar };
  productoSinIdProveedor.id_proveedor = 0;
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear un producto con id_proveedor no existente en la bd", productoSinIdProveedor, 400, API, HEADERS);

  const productoSinIdTipoProducto = { ...productoEditar };
  productoSinIdTipoProducto.id_tipo_producto = 0;
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear un producto con id_tipo_producto no existente en la bd", productoSinIdTipoProducto, 400, API, HEADERS);

  const productoSinIdUsuario = { ...productoEditar };
  productoSinIdUsuario.id_usuario = 0;
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear un producto con un id_usuario no existente en la bd", productoSinIdUsuario, 400, API, HEADERS);

  const productoSinIdUnidadMedida = { ...productoEditar };
  productoSinIdUnidadMedida.id_unidad_medida = 0;
  testFunctionPut(`${URL}/1`, "Debe retornar un error al crear un producto con un id_unidad_medida no existente en la bd", productoSinIdUnidadMedida, 400, API, HEADERS);

  const productoEditado = { ...productoEditar };
  productoEditado.descripcion_producto = "Producto 1 editado";
  testFunctionPut(`${URL}/1`, "Actualizar un producto", productoEditado, 200, API, HEADERS);
});

describe(`DELETE ${URL}/:id`, () => {
  testFunctionDelete(`${URL}/1`, "Debe retornar un error al no enviar el token", 401, API);

  testFunctionDelete(`${URL}/5`, "Eliminar un producto con un id inexistente", 400, API, HEADERS);

  testFunctionDelete(`${URL}/1`, "Debe retornar un status 200 al eliminar un producto", 200, API, HEADERS);
});

afterAll(async () => {
  // jest.setTimeout(10000);
// await vaciarTablas();
  await server.close();
});
