const express = require('express');
const routerApi = require('./routes');
// los middlewares de error se deben importar despues del router
const {errorHandler,logError} = require('./middlewares/errorsHandler')

const app = express();
const port = 3000;
// indicamos que recibimos archivos tipo JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logError)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port' +  port);
});
