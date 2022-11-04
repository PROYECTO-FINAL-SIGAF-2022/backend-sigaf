import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const ContabilidadModelo = connection.define(
  "contabilidades",
  {
    id_contabilidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion_contabilidad: {
      type: DataTypes.STRING,
    },

    observacion_contabilidad: {
      type: Sequelize.ENUM("pago mensual", "pago por dia", ""),
    },

    monto_contabilidad: {
      type: DataTypes.STRING,
    },

    tipo_contabilidad: {
      type: Sequelize.ENUM("egreso", "ingreso", ""),
    },
    fecha_contabilidad: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
