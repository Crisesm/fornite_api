const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
let usuario = {
 usuario:'',
 nivel: '',
 pavos: '',
 region: '',
};
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};
app.get('/', function(req, res) {
 respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Punto de inicio'
 };
 res.send(respuesta);
});
app.get('/usuario', function (req, res) {
 respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
 };
 if(usuario.usuario !== '' || usuario.nivel !== '' || usuario.pavos !== '' || usuario.region !== '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'El usuario no ha sido creado'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'respuesta del usuario',
   respuesta: usuario
  };
 }
 res.send(respuesta);
});
app.post('/usuario', function (req, res) {
 if(!req.body.usuario  || !req.body.nivel || !req.body.pavos || !req.body.region) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'todos los campos son requeridos'
  };
 } else {
  if(usuario.usuario !== '' || usuario.nivel !== '' || usuario.pavos !== '' || usuario.region !== '') {
   respuesta = {
    error: true,
    codigo: 503,
    mensaje: 'El usuario ya fue creado previamente'
   };
  } else {
   usuario = {
    usuario: req.body.usuario,
    pavos: req.body.pavos,
    region: req.body.region,
    nivel: req.body.nivel

   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Usuario creado',
    respuesta: usuario
   };
  }
 }
 
 res.send(respuesta);
});

app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});
app.listen(3000, () => {
 console.log("La api esta lista");
});