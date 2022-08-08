import { ActividadesModelo } from './actividades.model.js';
import { AgregoParcelasCultivosModelo } from './AgregoParcelasCultivos.model.js';
import { CampaniasModelo } from './Campanias.model.js';
import { CultivosModelo } from './Cultivos.model.js';
import { DetalleCampanias } from './DetalleCampanias.model.js';
import { EstablecimientosModelo } from './Establecimientos.model.js';
import { HistorialesParcelasCultivosModelo } from './HistorialesParcelasCultivos.model.js';
import { LogSistema } from './LogSistema.js';
import { ParcelasModelo } from './Parcelas.model.js';
import { ParcelasCultivosModelo } from './ParcelasCultivos.model.js';
import { PerdidasParcelasCultivosModelo } from './PerdidasParcelasCultivos.model.js';
import { ProductosModelo } from './Productos.model.js';
import { ProveedoresModelo } from './Proveedores.model.js';
import { TiposProductosModelo } from './TiposProductos.model.js';
import { TiposUsuariosModelo } from './TiposUsuarios.model.js';
import { UnidadesMedidasModelo } from './UnidadesMedidas.model.js';
import { UsuariosModelo } from './Usuarios.model.js';

// TABLA ACTIVIDADES

ActividadesModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: 'id_actividad',
  onDelete: 'cascade',
});

// TABLA AGREGO_PARCELAS_CULTIVOS

AgregoParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: 'id_parcela_cultivo',
  onDelete: 'cascade',
});

// TABLA CAMPANIAS
CampaniasModelo.belongsTo(CultivosModelo, {
  foreignKey: 'id_cultivo',
  onDelete: 'cascade',
});

CampaniasModelo.hasMany(DetalleCampanias, {
  foreignKey: 'id_campania',
  onDelete: 'cascade',
});

CampaniasModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: 'id_campania',
  onDelete: 'cascade',
});

// TABLA CULTIVOS

CultivosModelo.hasMany(CampaniasModelo, {
  foreignKey: 'id_cultivo',
  onDelete: 'cascade',
});

CultivosModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: 'id_cultivo',
  onDelete: 'cascade',
});

// TABLA DETALLE CAMPAÑAS
DetalleCampanias.belongsTo(CampaniasModelo, {
  foreignKey: 'id_campania',
  onDelete: 'cascade',
});

DetalleCampanias.belongsTo(UnidadesMedidasModelo, {
  foreignKey: 'id_unidad_medida',
  onDelete: 'cascade',
});

// TABLA ESTABLECIMIENTOS

EstablecimientosModelo.belongsTo(UsuariosModelo, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});

EstablecimientosModelo.hasMany(ParcelasModelo, {
  foreignKey: 'id_establecimiento',
  onDelete: 'cascade',
});

// TABLA HISTORIALES_PARCELAS_CULTIVOS

HistorialesParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: 'id_parcela_cultivo',
  onDelete: 'cascade',
});
HistorialesParcelasCultivosModelo.belongsTo(ActividadesModelo, {
  foreignKey: 'id_actividad',
  onDelete: 'cascade',
});

HistorialesParcelasCultivosModelo.belongsTo(UsuariosModelo, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});

HistorialesParcelasCultivosModelo.belongsTo(ProductosModelo, {
  foreignKey: 'id_producto',
  onDelete: 'cascade',
});

// TABLA LOG_SISTEMA

LogSistema.belongsTo(UsuariosModelo, {
  foreignKey: 'id_usuario',
});

// TABLA PARCELAS
ParcelasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: 'id_establecimiento',
  onDelete: 'cascade',
});

ParcelasModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: 'id_parcela',
  onDelete: 'cascade',
});

// TABLA PARCELAS_CULTIVOS
ParcelasCultivosModelo.belongsTo(ParcelasModelo, {
  foreignKey: 'id_parcela',
  onDelete: 'cascade',
});

ParcelasCultivosModelo.belongsTo(CultivosModelo, {
  foreignKey: 'id_cultivo',
  onDelete: 'cascade',
});

ParcelasCultivosModelo.belongsTo(CampaniasModelo, {
  foreignKey: 'id_campania',
  onDelete: 'cascade',
});

ParcelasCultivosModelo.hasMany(AgregoParcelasCultivosModelo, {
  foreignKey: 'id_parcela_cultivo',
  onDelete: 'cascade',
});

ParcelasCultivosModelo.hasMany(PerdidasParcelasCultivosModelo, {
  foreignKey: 'id_parcela_cultivo',
  onDelete: 'cascade',
});

// TABLA PERDIDAS_PARCELAS_CULTIVOS
PerdidasParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: 'id_parcela_cultivo',
  onDelete: 'cascade',
});

// TABLA PRODUCTOS
ProductosModelo.belongsTo(ProveedoresModelo, {
  foreignKey: 'id_proveedor',
  onDelete: 'cascade',
});
ProductosModelo.belongsTo(TiposProductosModelo, {
  foreignKey: 'id_tipo_producto',
  onDelete: 'cascade',
});

ProductosModelo.belongsTo(UsuariosModelo, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});

ProductosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: 'id_unidad_medida',
  onDelete: 'cascade',
});

ProductosModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: 'id_producto',
  onDelete: 'cascade',
});

// TABLA PROVEEDORES
ProveedoresModelo.hasMany(ProductosModelo, {
  foreignKey: 'id_proveedor',
  onDelete: 'cascade',
});

// TABLA TIPOS PRODUCTOS

TiposProductosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: 'id_unidad_medida',
  onDelete: 'cascade',
});

TiposProductosModelo.hasMany(ProductosModelo, {
  foreignKey: 'id_tipo_producto',
  onDelete: 'cascade',
});

// TABLA TIPOS USUARIOS
TiposUsuariosModelo.hasMany(UsuariosModelo, {
  foreignKey: 'id_tipo_usuario',
  onDelete: 'cascade',
});

// TABLA UNIDADES_MEDIDAS
UnidadesMedidasModelo.hasMany(ProductosModelo, {
  foreignKey: 'id_unidad_medida',
  onDelete: 'cascade',
});

UnidadesMedidasModelo.hasMany(DetalleCampanias, {
  foreignKey: 'id_unidad_medida',
  onDelete: 'cascade',
});

UnidadesMedidasModelo.hasMany(TiposProductosModelo, {
  foreignKey: 'id_unidad_medida',
  onDelete: 'cascade',
});

// TABLA USUARIOS
UsuariosModelo.belongsTo(TiposUsuariosModelo, {
  foreignKey: 'id_tipo_usuario',
});

UsuariosModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});

UsuariosModelo.hasMany(ProductosModelo, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});

UsuariosModelo.hasMany(EstablecimientosModelo, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});
UsuariosModelo.hasMany(LogSistema, {
  foreignKey: 'id_usuario',
  onDelete: 'cascade',
});
