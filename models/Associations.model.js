import { ActividadesModelo } from "./Actividades.model.js";
import { AgregoParcelasCultivosModelo } from "./AgregoParcelasCultivos.model.js";
import { CampaniasModelo } from "./Campanias.model.js";
import { CultivosModelo } from "./Cultivos.model.js";
import { DetalleCampanias } from "./DetalleCampanias.model.js";
import { EstablecimientosModelo } from "./Establecimientos.model.js";
import { HistorialesParcelasCultivosModelo } from "./HistorialesParcelasCultivos.model.js";
import { LogSistema } from "./LogSistema.js";
import { ParcelasModelo } from "./Parcelas.model.js";
import { ParcelasCultivosModelo } from "./ParcelasCultivos.model.js";
import { PerdidasParcelasCultivosModelo } from "./PerdidasParcelasCultivos.model.js";
import { ProductosModelo } from "./Productos.model.js";
import { ProveedoresModelo } from "./Proveedores.model.js";
import { TiposProductosModelo } from "./TiposProductos.model.js";
import { TiposUsuariosModelo } from "./TiposUsuarios.model.js";
import { UnidadesMedidasModelo } from "./UnidadesMedidas.model.js";
import { UsuariosModelo } from "./Usuarios.model.js";

// TABLA ACTIVIDADES

ActividadesModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: "id_actividad",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA AGREGO_PARCELAS_CULTIVOS

AgregoParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA CAMPANIAS
CampaniasModelo.belongsTo(CultivosModelo, {
  foreignKey: "id_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

CampaniasModelo.hasMany(DetalleCampanias, {
  foreignKey: "id_campania",
  onDelete: "restrict",
  onUpdate: "restrict",
});

CampaniasModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: "id_campania",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA CULTIVOS

CultivosModelo.hasMany(CampaniasModelo, {
  foreignKey: "id_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

CultivosModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: "id_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA DETALLE CAMPAÑAS
DetalleCampanias.belongsTo(CampaniasModelo, {
  foreignKey: "id_campania",
  onDelete: "restrict",
  onUpdate: "restrict",
});

DetalleCampanias.belongsTo(UnidadesMedidasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA ESTABLECIMIENTOS

EstablecimientosModelo.belongsTo(UsuariosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(ParcelasModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA HISTORIALES_PARCELAS_CULTIVOS

HistorialesParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});
HistorialesParcelasCultivosModelo.belongsTo(ActividadesModelo, {
  foreignKey: "id_actividad",
  onDelete: "restrict",
  onUpdate: "restrict",
});

HistorialesParcelasCultivosModelo.belongsTo(UsuariosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

HistorialesParcelasCultivosModelo.belongsTo(ProductosModelo, {
  foreignKey: "id_producto",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA LOG_SISTEMA

LogSistema.belongsTo(UsuariosModelo, {
  foreignKey: "id_usuario",
});

// TABLA PARCELAS
ParcelasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: "id_parcela",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA PARCELAS_CULTIVOS
ParcelasCultivosModelo.belongsTo(ParcelasModelo, {
  foreignKey: "id_parcela",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.belongsTo(CultivosModelo, {
  foreignKey: "id_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.belongsTo(CampaniasModelo, {
  foreignKey: "id_campania",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.hasMany(AgregoParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.hasMany(PerdidasParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA PERDIDAS_PARCELAS_CULTIVOS
PerdidasParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA PRODUCTOS
ProductosModelo.belongsTo(ProveedoresModelo, {
  foreignKey: "id_proveedor",
  onDelete: "restrict",
  onUpdate: "restrict",
});
ProductosModelo.belongsTo(TiposProductosModelo, {
  foreignKey: "id_tipo_producto",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ProductosModelo.belongsTo(UsuariosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ProductosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ProductosModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: "id_producto",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA PROVEEDORES
ProveedoresModelo.hasMany(ProductosModelo, {
  foreignKey: "id_proveedor",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA TIPOS PRODUCTOS

TiposProductosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

TiposProductosModelo.hasMany(ProductosModelo, {
  foreignKey: "id_tipo_producto",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA TIPOS USUARIOS
TiposUsuariosModelo.hasMany(UsuariosModelo, {
  foreignKey: "id_tipo_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA UNIDADES_MEDIDAS
UnidadesMedidasModelo.hasMany(ProductosModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

UnidadesMedidasModelo.hasMany(DetalleCampanias, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

UnidadesMedidasModelo.hasMany(TiposProductosModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA USUARIOS
UsuariosModelo.belongsTo(TiposUsuariosModelo, {
  foreignKey: "id_tipo_usuario",
});

UsuariosModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

UsuariosModelo.hasMany(ProductosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

UsuariosModelo.hasMany(EstablecimientosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});
UsuariosModelo.hasMany(LogSistema, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});
