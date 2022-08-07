import { DataTypes } from "sequelize";
import { connection } from '../config/connection.js'

export const Tipo_usuario =  connection.define("tipo_usuarios",{
    id_tipo_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion_tipo_usuario:{
        type:DataTypes.STRING,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
    
    
})



