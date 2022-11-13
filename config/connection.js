import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import getConnectionData from "../helpers/getConnectionData.js";

dotenv.config();

const { database, username, password } = getConnectionData();

// ! borrar al lanzar a producccion
//  !npm run seed bd=dev server=local
const args = process.argv;

// console.log(args);
const resultArgBd = args.find((arg) => arg.includes("bd="));

let nombreBD = "";
// console.log(args);
if (args.length > 0 && resultArgBd) {
  const [, dbNameArgs] = resultArgBd.split("=");
  // console.log(dbNameArgs);
  nombreBD = `sigaf_${dbNameArgs}`;
} else {
  nombreBD = database;
}

const resultArgServerLocal = args.find((arg) => arg.includes("server=local"));

export const connection = new Sequelize(!resultArgServerLocal ? nombreBD : "sigaf_test", !resultArgServerLocal ? username : "root", !resultArgServerLocal ? password : "", {
  host: !resultArgServerLocal ? process.env.HOSTNAME : "localhost",
  dialect: "mariadb",
  port: !resultArgServerLocal ? process.env.DATABSEPORT : "3306",
  ssl: false,
  logging: false,
  timezone: "-03:00",
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
