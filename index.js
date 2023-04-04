const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');

const {errorHandler,logError,boomErrorHandler} = require('./middlewares/errorsHandler')

const app = express();
const port = 3000;

app.use(express.json());

//lista de urls permitidas
const whitelist = ['http://localhost:8080', 'https://myapp.co'];

//configuracion del originen
const options = {
  origin: (origin, callback) => {
    // si se incluye pasa el cors
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      //lanza un error
      callback(new Error('no permitido'));
    }
  }
}
//la utilziamos como un middleware
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logError)
app.use (boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port' +  port);
});
