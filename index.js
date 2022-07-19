import express from 'express';
import morgan from 'morgan';
import connection from './config/connection.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 4000);

try {
  await connection.authenticate();
  console.log('Se ha establecido correctamente la conexion con mariadb.');
  // sincronizar tablas
  await connection.sync({ alter: true });
  console.log('Sincronizacion completa');
} catch (error) {
  console.error('No se puede conectar con mariadb:', error);
}

app.listen(app.get('port'), () => {
  console.log('Server is running on port 4000');
});
