import { DataTypes } from "sequelize";
import { connection } from '../config/connection.js'

export const historiales_parcelas_cultivosModelo =  connection.define("historiales_parcelas_cultivos",{
    id_historial_parcelas_cultivos:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_parcela_cultivo:{
        type:DataTypes.INTEGER,
    },
    id_actividad:{
        type:DataTypes.INTEGER,
    },
    id_usuario:{
        type:DataTypes.INTEGER,
    },
    cantidad_uso_producto:{
        type:DataTypes.INTEGER,
    },
    id_producto:{
        type:DataTypes.INTEGER,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
})

