import { DataTypes } from "sequelize";
import { connection } from '../config/connection.js'

export const campaniasModelo =  connection.define("campanias",{
    id_campania:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion_campania:{
        type:DataTypes.STRING,
    },
    fecha_inicio:{
        type:DataTypes.STRING,
    },
    fecha_final:{
        type:DataTypes.STRING,
    },
    id_cultivo:{
        type:DataTypes.INTEGER,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
})

