const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/handleError')

const app = express();
const port = 3005;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options)); // Cuando no tiene opciones, acepta cualquier origen

// Definir ruta
// app.get('/', (req, res) => {
//   res.send('Hola server en express');
// });

// app.get('/nueva-ruta', (req, res) => {
//   res.send('Nuevo end point');
// });

routerApi(app);

// Middleware de error después del routing
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Escuchar puerto
app.listen(port, () => {
  console.log(`Mi puerto ${port}`);
});

