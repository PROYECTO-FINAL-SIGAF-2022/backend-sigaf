import { ActividadesModelo } from "./Actividades.model.js";
import { AgregoParcelasCultivosModelo } from "./AgregoParcelasCultivos.model.js";
import { AlmacenesModelo } from "./Almacenes.model.js";
import { CampaniasModelo } from "./Campanias.model.js";
import { ContabilidadModelo } from "./Contabilidad.model.js";
import { CosechasModelo } from "./Cosechas.model.js";
import { CultivosModelo } from "./Cultivos.model.js";
import { DetalleCampanias } from "./DetalleCampanias.model.js";
import { EmpleadosParcelasCultivosModelo } from "./EmpleadosParcelasCultivos.model.js";
import { EstablecimientosModelo } from "./Establecimientos.model.js";
import { HistorialesParcelasCultivosModelo } from "./HistorialesParcelasCultivos.model.js";
import { LogSistema } from "./LogSistema.js";
import { MaquinasModelo } from "./Maquinas.model.js";
import { MaquinasParcelasCultivosModelo } from "./MaquinasParcelasCultivos.model.js";
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

ActividadesModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA AGREGO_PARCELAS_CULTIVOS

AgregoParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

AgregoParcelasCultivosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

AgregoParcelasCultivosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA CAMPANIAS
// CampaniasModelo.belongsTo(CultivosModelo, {
//   foreignKey: "id_cultivo",
//   onDelete: "restrict",
//   onUpdate: "restrict",
// });

CampaniasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
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

// CultivosModelo.hasMany(CampaniasModelo, {
//   foreignKey: "id_cultivo",
//   onDelete: "restrict",
//   onUpdate: "restrict",
// });

CultivosModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: "id_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

CultivosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
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

DetalleCampanias.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
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
HistorialesParcelasCultivosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA LOG_SISTEMA

LogSistema.belongsTo(UsuariosModelo, {
  foreignKey: "id_usuario",
});

// TABLA PARCELAS
ParcelasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
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

ParcelasCultivosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.belongsTo(CampaniasModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});
ParcelasCultivosModelo.belongsTo(CampaniasModelo, {
  foreignKey: "id_campania",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.hasMany(ContabilidadModelo, {
  foreignKey: "id_parcela_cultivo",
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
ParcelasCultivosModelo.hasMany(EmpleadosParcelasCultivosModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.hasMany(CosechasModelo, {
  foreignKey: "id_parcela_cultivo",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ParcelasCultivosModelo.hasMany(MaquinasParcelasCultivosModelo, {
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

PerdidasParcelasCultivosModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

PerdidasParcelasCultivosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA ALMACENES

AlmacenesModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

AlmacenesModelo.hasMany(EstablecimientosModelo, {
  foreignKey: "id_almacen",
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
ProductosModelo.belongsTo(AlmacenesModelo, {
  foreignKey: "id_almacen",
  onDelete: "restrict",
  onUpdate: "restrict",
});

ProductosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
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

ProveedoresModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA TIPOS PRODUCTOS

// TiposProductosModelo.belongsTo(UnidadesMedidasModelo, {
//   foreignKey: "id_unidad_medida",
//   onDelete: "restrict",
//   onUpdate: "restrict",
// });
TiposProductosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
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

UnidadesMedidasModelo.hasMany(DetalleCampanias, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

UnidadesMedidasModelo.hasMany(CosechasModelo, {
  foreignKey: "id_unidad_medida",
  onDelete: "restrict",
  onUpdate: "restrict",
});

UnidadesMedidasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// UnidadesMedidasModelo.hasMany(TiposProductosModelo, {
//   foreignKey: "id_unidad_medida",
//   onDelete: "restrict",
//   onUpdate: "restrict",
// });

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
UsuariosModelo.hasMany(EmpleadosParcelasCultivosModelo, {
  foreignKey: "id_usuario",
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA EMPLEADOS PARCELAS CULTIVOS

EmpleadosParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: {
    name: "id_parcela_cultivo",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});
EmpleadosParcelasCultivosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

EmpleadosParcelasCultivosModelo.belongsTo(UsuariosModelo, {
  foreignKey: {
    name: "id_usuario",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA MAQUINA
MaquinasModelo.hasMany(MaquinasParcelasCultivosModelo, {
  foreignKey: "id_maquina",
  onDelete: "restrict",
  onUpdate: "restrict",
});

MaquinasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA MAQUINAS PARCELAS
MaquinasParcelasCultivosModelo.belongsTo(MaquinasModelo, {
  foreignKey: {
    name: "id_maquina",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

MaquinasParcelasCultivosModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: {
    name: "id_parcela_cultivo",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

MaquinasParcelasCultivosModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA COSECHAS

CosechasModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: {
    name: "id_parcela_cultivo",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

CosechasModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_establecimiento",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

CosechasModelo.belongsTo(UnidadesMedidasModelo, {
  foreignKey: {
    name: "id_unidad_medida",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

// TABLA CONTABILIDA

ContabilidadModelo.belongsTo(ParcelasCultivosModelo, {
  foreignKey: {
    name: "id_parcela_cultivo",
    allowNull: false,
  },
  onDelete: "restrict",
  onUpdate: "restrict",
});

ContabilidadModelo.belongsTo(EstablecimientosModelo, {
  foreignKey: {
    name: "id_parcela_cultivo",
    allowNull: false,
  },
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

EstablecimientosModelo.hasMany(ActividadesModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(AgregoParcelasCultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(CampaniasModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(CultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(DetalleCampanias, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(HistorialesParcelasCultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(ParcelasCultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(PerdidasParcelasCultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(ProductosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(ProveedoresModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(TiposProductosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(UnidadesMedidasModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(AlmacenesModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(EmpleadosParcelasCultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(MaquinasModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(MaquinasParcelasCultivosModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
EstablecimientosModelo.hasMany(CosechasModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});

EstablecimientosModelo.hasMany(ContabilidadModelo, {
  foreignKey: "id_establecimiento",
  onDelete: "restrict",
  onUpdate: "restrict",
});
