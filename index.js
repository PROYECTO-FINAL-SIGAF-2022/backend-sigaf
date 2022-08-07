import express from 'express';
import morgan from 'morgan';
import {connection} from './config/connection.js';
const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 4000);

try {
  await connection.authenticate();
  console.log('Se ha establecido correctamente la conexion con la base de datos.');
  // sincronizar tablas
  await connection.sync({ alter: true });
  console.log('Sincronizacion completa');
} catch (error) {
  console.error('No se puede conectar con la base de datos:', error);
}

//Rutas
import usuarioRutas from './routes/usuarios.routes.js'
import establecimientoRutas from './routes/establecimientos.routes.js'
import actividadesRutas from './routes/actividades.routes.js'
import campaniaRutas from './routes/actividades.routes.js'
import cultivoRutas from './routes/cultivo.routes.js'
import historiales_parcelas_cultivosRutas from './routes/historiales_parcelas_cultivos.routes.js'
import parcelaRutas from './routes/parcela.routes.js'
import parcelas_cultivosRutas from './routes/parcelas_cultivos.routes.js'
import tipo_usuarioRutas from './routes/tipo_usuarios.routes.js'
app.use(usuarioRutas)
app.use(establecimientoRutas)
app.use(actividadesRutas)
app.use(campaniaRutas)
app.use(cultivoRutas)
app.use(historiales_parcelas_cultivosRutas)
app.use(parcelaRutas)
app.use(parcelas_cultivosRutas)
app.use(tipo_usuarioRutas)


app.listen(app.get('port'), () => {
  console.log('Server is running on port 4000');
});
