const express = require('express')
const cors = require('cors')
const routersApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handle')

const app  = express()
const port = 3000;

// Este middelware nos permite obtener la informacion que es enviada en la peticiones HTTP
// Nos permite capturar esa informacion en formato JSON
app.use(express.json());

// creo un array con las ip que aceptare que consulten mis endpoints
const whitelist = ['http://localhost:8080','124.123.543.12', 'https://myapp.com']
// aca configuro cuales ip seran aceptadas
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    }else{
      callback(new Error('ip no permitida'));
    }
  }
}
// app.use(cors()); // De esta manera habilitamos cualquier ip a consultar nuestros endpoints
app.use(cors(options)); // De esta manera habilitamos cualquier ip a consultar nuestros endpoints

routersApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Corriendo en el puerto ' + port);
});
