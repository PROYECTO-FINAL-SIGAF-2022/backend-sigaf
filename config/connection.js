import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import getConnectionData from "../helpers/getConnectionData.js";

dotenv.config();

const { database, username, password } = getConnectionData();

// ! borrar al lanzar a producccion
const args = process.argv.slice(2);
let nombreBD = "";
if (args.length > 0) {
  const [, dbNameArgs] = args[0].split("=");
  nombreBD = `sigaf_${dbNameArgs}`;
} else {
  nombreBD = database;
}

export const connection = new Sequelize(nombreBD, username, password, {
  host: process.env.HOSTNAME,
  dialect: "mariadb",
  port: process.env.DATABSEPORT,
  ssl: false,
  logging: false,
});

/* export const connection = new Sequelize(
   'test',
   'root',
   '',
   {
     host:  'localhost',
     dialect: 'mysql',
     port: '3306',
     ssl: true,
     logging: false,
   }
 ); */

/* export default connection; */
