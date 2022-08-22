import express from 'express';
import morgan from 'morgan';
import { connection } from './config/connection.js';
import { rutas } from './routes/index.routes.js';

// RELACIONES
import './models/Associations.model.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 4000);

// RUTAS

app.use(rutas());

try {
  await connection.authenticate();
  console.log(
    'Se ha establecido correctamente la conexion con la base de datos.'
  );
  // sincronizar tablas
  await connection.sync({ alter: true });
  // await connection.truncate({ cascade: true, force: true });
  console.log('Sincronizacion completa');
} catch (error) {
  console.error('No se puede conectar con la base de datos:', error);
}

app.listen(app.get('port'), () => {
  console.log('Server is running on port 4000');
});
