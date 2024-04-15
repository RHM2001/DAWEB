var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database')
var request = require('request');

var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', function (req, res, next) {
  let jwt = req.cookies.jwt

  let nombre = req.body.nombre
  let coordenadas = req.body.coordenadas
  let ciudad = req.body.ciudad

  let id

  var url = 'http://localhost:8090/restaurantes';

  var data = {
    nombre: nombre,
    coordenadas: coordenadas,
    ciudad: ciudad
  };

  var clientServerOptions = {
    uri: url,
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt

    }
  }

  request(clientServerOptions, function (error, response, body) {
    let nuevaURL = response.headers.location
    const urlParts = nuevaURL.split('/');
    id = urlParts[urlParts.length - 1];
    res.send(id)
  });

});

router.post('/opinion', function (req, res, next) {

  console.log("estoy en el opinion")
  
  let jwt = req.cookies.jwt
  const id = req.query.id;

  var url = 'http://localhost:8090/restaurantes/' + id + '/opinion';


  var clientServerOptions = {
    uri: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }

  request(clientServerOptions, function (error, response, body) {
    console.log(response.statusCode)
    if (error) {
      return next(error);
    }

    console.log("idOp" +body)
    res.send(body);
  });

});

router.get('/all', function (req, res, next) {

  let jwt = req.cookies.jwt
  console.log(jwt)

  var url = 'http://localhost:8090/restaurantes';

  var clientServerOptions = {
    uri: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }

  request(clientServerOptions, function (error, response, body) {
    if (error) {
      return next(error);
    }
    if (response.statusCode !== 200) {
      return next(new Error('La solicitud no fue exitosa'));

    }
    console.log(body);
    res.send(body);
  });

});

router.get('/single', function (req, res, next) {
  const id = req.query.id;

  let jwt = req.cookies.jwt

  var url = 'http://localhost:8090/restaurantes/' + id;

  var clientServerOptions = {
    uri: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }
  request(clientServerOptions, function (error, response, body) {
    if (error) {
      return next(error);
    }
    if (response.statusCode !== 200) {
      return next(new Error('La solicitud no fue exitosa'));
    }
    console.log(body);
    res.send(body);
  });
});

router.get('/allValoraciones', function (req, res, next) {
  const id = req.query.id;

  let jwt = req.cookies.jwt

  var url = 'http://localhost:8090/restaurantes/' + id + "/opinion";

  var clientServerOptions = {
    uri: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }
  request(clientServerOptions, function (error, response, body) {
    if (error) {
      return next(error);
    }
    if (response.statusCode !== 200) {
      return next(new Error('La solicitud no fue exitosa'));
    }
    res.send(body);
  });
});

router.delete('/borrar', function (req, res, next) {
  
  let jwt = req.cookies.jwt
  const id = req.query.id;

  var url = 'http://localhost:8090/restaurantes/' + id;

  var clientServerOptions = {
    uri: url,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }

  request(clientServerOptions, function (error, response, body) {
    console.log(response.statusCode)
    if (error) {
      return next(error);
    }
    res.send(body);
  });

});


router.put('/actualizar', function (req, res, next) {
  
  let jwt = req.cookies.jwt
  const id = req.query.id;
  let nombre = req.body.nombre
  let coordenadas = req.body.coordenadas

  console.log(id)
  console.log(nombre)
  console.log(coordenadas)

  var url = 'http://localhost:8090/restaurantes/' + id;

  var data = {
    id: id,
    nombre: nombre,
    coordenadas: coordenadas,
  };

  var clientServerOptions = {
    uri: url,
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }

  request(clientServerOptions, function (error, response, body) {
    console.log(response.statusCode)
    if (error) {
      return next(error);
    }
    res.send(body);
  });

});



router.post('/valorar', function (req, res, next) {

  console.log("estoy en el valorar")
  
  let jwt = req.cookies.jwt
  const id = req.query.id;
  let correo = req.body.correo
  let fecha = req.body.fecha
  let calificacion = req.body.calificacion
  let comentario = req.body.comentario

  console.log(id)

  var url = 'http://localhost:8090/opiniones/' + id;

  var data = {
    correo: correo,
    fecha: fecha,
    calificacion: calificacion,
    comentario: comentario
  };


  var clientServerOptions = {
    uri: url,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt
    }
  }

  request(clientServerOptions, function (error, response, body) {
    console.log(response.statusCode)
    if (error) {
      return next(error);
    }
    res.send(body);
  });

});

module.exports = router;
