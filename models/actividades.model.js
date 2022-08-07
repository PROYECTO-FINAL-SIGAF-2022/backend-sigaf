import { DataTypes } from "sequelize";
import { connection } from '../config/connection.js'

export const actividadesModelo =  connection.define("actividades",{
    id_actividad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion_actividad:{
        type:DataTypes.STRING,
    },
})

