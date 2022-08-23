import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize(
  process.env.DATABASENAME || 'sigaf',
  process.env.DATABASEUSER || 'root',
  process.env.DATABASEPASSWORD || '',
  {
    host: process.env.HOSTNAME || 'localhost',
    dialect: 'mariadb',
    port: process.env.DATABSEPORT || '3306',
    ssl: true,
    logging: false,
  }
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
