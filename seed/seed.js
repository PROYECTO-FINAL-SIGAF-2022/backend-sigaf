// CARGAR DATOS FICTISIOS PARA PRUEBAS

import { ActividadesModelo } from '../models/actividades.model.js';
import { AgregoParcelasCultivosModelo } from '../models/AgregoParcelasCultivos.model.js';
import { CampaniasModelo } from '../models/Campanias.model.js';
import { CultivosModelo } from '../models/Cultivos.model.js';
import { DetalleCampanias } from '../models/DetalleCampanias.model.js';
import { EstablecimientosModelo } from '../models/Establecimientos.model.js';
import { HistorialesParcelasCultivosModelo } from '../models/HistorialesParcelasCultivos.model.js';
import { LogSistema } from '../models/LogSistema.js';
import { ParcelasModelo } from '../models/Parcelas.model.js';
import { ParcelasCultivosModelo } from '../models/ParcelasCultivos.model.js';
import { PerdidasParcelasCultivosModelo } from '../models/PerdidasParcelasCultivos.model.js';
import { ProductosModelo } from '../models/Productos.model.js';
import { ProveedoresModelo } from '../models/Proveedores.model.js';
import { TiposProductosModelo } from '../models/TiposProductos.model.js';
import { TiposUsuariosModelo } from '../models/TiposUsuarios.model.js';
import { UnidadesMedidasModelo } from '../models/UnidadesMedidas.model.js';
import { UsuariosModelo } from '../models/Usuarios.model.js';

// console.log('first');

// export const seedBd = async () => {
// 1
TiposUsuariosModelo.create({
  descripcion_tipo_usuario: 'Administrador',
  activo: true,
});

// 2

UsuariosModelo.create({
  nombre_persona: 'Marcos',
  apellido_persona: 'Franco',
  dni_persona: 43711821,
  fecha_nac_persona: '20/10/1996',
  telefono_persona: 3704981212,
  username_usuario: 'marcosdev',
  password_usuario: '123456',
  id_tipo_usuario: 1,
  activo: true,
});

// 3

CultivosModelo.create({
  cultivo: 'Maiz',
  activo: true,
});

// 4

TiposProductosModelo.create({
  descripcion_tipo_producto: 'Estiercol',
});

// 5
ProveedoresModelo.create({
  nombre_proveedor: 'proveedor 1',
  telefono_proveedor: '3704981212',
  direccion_proveedor: 'Avenida siempre viva',
});

// 6

UnidadesMedidasModelo.create({
  descripcion_unidad_medida: 'Kilogramos',
});

// 7

ActividadesModelo.create({
  descripcion_actividad: 'Cosechar',
});

// 8

ProductosModelo.create({
  descripcion_producto: 'Fertilizante',
  fecha_vencimiento_producto: '20/10/2020',
  cantidad_producto: '10',
  id_proveedor: 1,
  id_tipo_producto: 1,
  id_usuario: 1,
  id_unidad_medida: 1,
});

// 9

LogSistema.create({
  descripcion_log: 'Se cargo el producto fertilizante',
  fecha_hora: '20/10/2020',
  id_usuario: 1,
});

// 10
EstablecimientosModelo.create({
  descripcion_establecimiento: 'Establecimiento 1',
  georeferencia: '-34.6037,-58.3816',
  superficie: ' 100',
  id_usuario: 1,
  activo: true,
});

// 11
CampaniasModelo.create({
  descripcion_campania: 'La super campaña de maiz',
  fecha_inicio: '20/10/2020',
  fecha_final: '20/10/2021',
  id_cultivo: 1,
  activo: true,
});

// 12

ParcelasModelo.create({
  georeferencia: ' -34.6037,-58.3816',
  superficie: ' 70',
  id_establecimiento: '1',
  activo: true,
});

// 13
ParcelasCultivosModelo.create({
  id_parcela: 1,
  id_cultivo: '1',
  id_campania: '1',
  cantidad_sembrada: '23131',
  activo: true,
});

// 14

DetalleCampanias.create({
  id_campania: '1',
  id_unidad_medida: '1',
  cantidad_cosechada: '2000',
});

// 15

HistorialesParcelasCultivosModelo.create({
  id_parcela_cultivo: '1',
  id_actividad: '1',
  id_usuario: '1',
  cantidad_uso_producto: '2',
  id_producto: 1,
  activo: true,
});

// 16

AgregoParcelasCultivosModelo.create({
  id_parcela_cultivo: '1',
  cantidad_agregada: '20',
});

// 17
PerdidasParcelasCultivosModelo.create({
  id_parcela_cultivo: '1',
  cantidad_perdida: '10',
});
// };
