import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import getConnectionData from "../helpers/getConnectionData.js";

dotenv.config();

const { database, username, password } = getConnectionData();

// console.log(process.env.HOSTNAME);

export const connection = new Sequelize(
  database,
  username,
  password,
  {
    host: process.env.HOSTNAME,
    dialect: "mariadb",
    port: process.env.DATABSEPORT,
    ssl: false,
    logging: false,
  },
);

// export const connection = new Sequelize(
//   process.env.DATABASENAME || 'sigaf',
//   process.env.DATABASEUSER || 'root',
//   process.env.DATABASEPASSWORD || '',
//   {
//     host: process.env.HOSTNAME || 'localhost',
//     dialect: 'mysql',
//     port: process.env.DATABSEPORT || '3306',
//     ssl: true,
//     logging: false,
//   }
// );

/* export default connection; */
