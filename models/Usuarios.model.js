import { DataTypes } from "sequelize";
import { connection } from '../config/connection.js'
import {Tipo_usuario} from './Tipos_usuarios.model.js'
export const Usuario =  connection.define("usuarios",{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_persona:{
        type:DataTypes.STRING,
    },
    apellido_persona:{
        type:DataTypes.STRING,
    },
    dni_persona:{
        type:DataTypes.STRING,
    },
    fecha_nac_persona:{
        type:DataTypes.STRING,
    },
    telefono_persona:{
        type:DataTypes.STRING,
    },
    username_usuario:{
        type:DataTypes.STRING,
    },
    password_usuario:{
        type:DataTypes.STRING,
    },
    id_tipo_usuario:{
        type:DataTypes.INTEGER,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    },
})

//Verificar
Usuario.belongsTo(Tipo_usuario,{foreignKey: 'id_tipo_usuario'});
Tipo_usuario.hasMany(Usuario,{foreignKey: 'id_tipo_usuario'});