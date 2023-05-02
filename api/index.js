const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');
const passport = require('passport')

const {errorHandler,logError,boomErrorHandler, ormErrorHandler} = require('./middlewares/errorsHandler')

const app = express();
// le indicamos el puerto como una variable de entorno o el 3000
const port = process.env.PORT || 3000;

app.use(express.json());

//lista de urls permitidas
const whitelist = ['http://localhost:8080', 'https://myapp.co'];

//configuracion del origin
const options = {
  origin: (origin, callback) => {
    // si se incluye pasa el cors o es el mismo origen
    if (whitelist.includes(origin) || !origin ) {
      callback(null, true);
    } else {
      //lanza un error
      callback(new Error('no permitido'));
    }
  }
}
//la utilziamos como un middleware
app.use(cors(options))

//inicilizamos passport
app.use(passport.initialize());

//llamamos a la autenticacion
require('./utils/auth')

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta',(req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logError)
app.use(ormErrorHandler)
app.use (boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  // console.log('Mi port' +  port);
});
