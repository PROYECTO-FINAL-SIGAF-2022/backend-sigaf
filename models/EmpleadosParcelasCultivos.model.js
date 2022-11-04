import { DataTypes, Sequelize } from "sequelize";
import { connection } from "../config/connection.js";

export const EmpleadosParcelasCultivosModelo = connection.define(
  "empleados_parcelas_cultivos",
  {
    id_empleado_parcela_cultivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_alta: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    // precio_sueldo: {
    //   type: DataTypes.STRING,
    // },

    // fecha_pago: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },

    // tipo_pago: {
    //   type: Sequelize.ENUM("mensual", "por dia"),
    // },

  },
  {
    timestamps: false,
  },
);
