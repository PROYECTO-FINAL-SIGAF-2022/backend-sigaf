// CARGAR DATOS FICTISIOS PARA PRUEBAS

import bcrypt from "bcryptjs";
import { connection } from "../config/connection.js";

import { ActividadesModelo } from "../models/Actividades.model.js";
import { AgregoParcelasCultivosModelo } from "../models/AgregoParcelasCultivos.model.js";
import { CampaniasModelo } from "../models/Campanias.model.js";
import { CultivosModelo } from "../models/Cultivos.model.js";
import { DetalleCampanias } from "../models/DetalleCampanias.model.js";
import { EstablecimientosModelo } from "../models/Establecimientos.model.js";
import { HistorialesParcelasCultivosModelo } from "../models/HistorialesParcelasCultivos.model.js";
import { LogSistema } from "../models/LogSistema.js";
import { ParcelasModelo } from "../models/Parcelas.model.js";
import { ParcelasCultivosModelo } from "../models/ParcelasCultivos.model.js";
import { PerdidasParcelasCultivosModelo } from "../models/PerdidasParcelasCultivos.model.js";
import { ProductosModelo } from "../models/Productos.model.js";
import { ProveedoresModelo } from "../models/Proveedores.model.js";
import { TiposProductosModelo } from "../models/TiposProductos.model.js";
import { TiposUsuariosModelo } from "../models/TiposUsuarios.model.js";
import { UnidadesMedidasModelo } from "../models/UnidadesMedidas.model.js";
import { UsuariosModelo } from "../models/Usuarios.model.js";

import "../models/Associations.model.js";

// ! resetar bd => npm run dev bd=dev o bd=test

const args = process.argv.slice(2);

const nombreBD = args[0].split("=")[1];
// console.log(nombreBD);
const seedBd = async () => {
  // const nombreBD = process.env.NODE_ENV === "test" ? "test" : "test";
  await connection.query(`DROP DATABASE IF EXISTS sigaf_${nombreBD}`);
  await connection.query(`CREATE DATABASE sigaf_${nombreBD}`);
  await connection.query(`USE sigaf_${nombreBD}`);
  // await connection.truncate({ cascade: true, force: true });
  await connection.authenticate();

  await connection.sync({ alter: true, force: true });

  // 1
  await TiposUsuariosModelo.create({
    descripcion_tipo_usuario: "Administrador",
    rutas_usuario: ["usuarios", "establecimientos", "actividades", "campanias", "cultivos", "historiales", "parcelas", "parcelas-cultivos", "tipos-usuarios", "detalle-campanias", "tipo-productos", "agregar-parcela-cultivos", "proveedores", "unidades-medidas", "productos", "perdidas-parcelas-cultivos", "establecimientos-usuarios", "verificar-token-establecimiento-usuario", "establecimiento-usuario"],
    activo: true,
  });

  // 2

  const salt = bcrypt.genSaltSync(10);
  const passwordEncriptado = bcrypt.hashSync("123456", salt);

  await UsuariosModelo.create({
    nombre_persona: "Marcos",
    apellido_persona: "Franco",
    dni_persona: 43711821,
    fecha_nac_persona: "1996/10/10",
    telefono_persona: 3704981,
    email_persona: "correo@gmail.com",
    username_usuario: "usuariodev",
    password_usuario: passwordEncriptado,
    id_tipo_usuario: 1,
    activo: true,
  });

  // 3
  await EstablecimientosModelo.create({
    descripcion_establecimiento: "Establecimiento 1",
    georeferencia: "-34.6037,-58.3816",
    superficie: " 100",
    id_usuario: 1,
    activo: true,
  });

  // 4

  await CultivosModelo.create({
    descripcion_cultivo: "Maiz",
    id_establecimiento: "1",
    activo: true,
  });

  // 5

  await TiposProductosModelo.create({
    descripcion_tipo_producto: "Estiercol",
  });

  // 6
  await ProveedoresModelo.create({
    nombre_proveedor: "proveedor 1",
    telefono_proveedor: "3704981212",
    direccion_proveedor: "Avenida siempre viva",
  });

  // 7

  await UnidadesMedidasModelo.create({
    descripcion_unidad_medida: "Kilogramos",
  });

  // 8

  await ActividadesModelo.create({
    descripcion_actividad: "Cosechar",
    id_establecimiento: 1,
  });

  // 9

  await ProductosModelo.create({
    descripcion_producto: "Fertilizante",
    fecha_vencimiento_producto: "2020/10/10",
    cantidad_producto: "10",
    precio_producto: 1000,
    id_proveedor: 1,
    id_tipo_producto: 1,
    id_usuario: 1,
    id_unidad_medida: 1,
    id_establecimiento: 1,
  });

  // 10

  await LogSistema.create({
    descripcion_log: "Se cargo el producto fertilizante",
    fecha_hora: "2020/10/10",
    id_usuario: 1,
  });

  // 11
  await CampaniasModelo.create({
    descripcion_campania: "La super campaña de maiz",
    fecha_inicio: "2020/10/10",
    fecha_final: "2021/10/21",
    id_cultivo: 1,
    activo: true,
    id_establecimiento: 1,
  });

  // 12

  await ParcelasModelo.create({
    georeferencia: " -34.6037,-58.3816",
    superficie: " 70",
    id_establecimiento: "1",
    activo: true,
  });

  // 13
  await ParcelasCultivosModelo.create({
    id_parcela: 1,
    id_cultivo: "1",
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_sembrada: "23131",
    activo: true,
    id_establecimiento: "1",
  });

  // 14

  await DetalleCampanias.create({
    id_campania: "1",
    id_unidad_medida: "1",
    cantidad_cosechada: "2000",
    id_establecimiento: "1",
  });

  // 15

  await HistorialesParcelasCultivosModelo.create({
    id_parcela_cultivo: "1",
    id_actividad: "1",
    id_usuario: "1",
    cantidad_uso_producto: "2",
    id_producto: 1,
    activo: true,
    id_establecimiento: "1",
  });

  // 16

  await AgregoParcelasCultivosModelo.create({
    id_parcela_cultivo: "1",
    id_unidad_medida: "1",
    cantidad_agregada: "20",
    id_establecimiento: "1",
  });

  // 17
  await PerdidasParcelasCultivosModelo.create({
    id_parcela_cultivo: "1",
    id_unidad_medida: "1",
    cantidad_perdida: "10",
    id_establecimiento: "1",
  });

  await connection.query("SET GLOBAL FOREIGN_KEY_CHECKS = 1;");
};
seedBd();
