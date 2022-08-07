import { DataTypes } from "sequelize";
import { connection } from '../config/connection.js'

export const Establecimiento =  connection.define("establecimiento",{
    id_establecimiento:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion_establecimiento:{
        type:DataTypes.STRING,
    },
    georeferencia:{
        type:DataTypes.STRING,
    },
    superficie:{
        type:DataTypes.STRING,
    },
    id_usuario:{
        type: DataTypes.INTEGER,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
})

