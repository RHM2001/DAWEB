var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database')
var request = require('request');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/alta', function (req, res, next) {

    let jwt = req.cookies.jwt
    const id = req.query.id;

    let nombre = req.body.nombre
    let descripcion = req.body.descripcion
    let precio = req.body.precio

    var url = 'http://localhost:8090/restaurantes/' + id + '/platos';

    var data = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio
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
        console.log(response.statusCode)
        res.send(id)
    });

});

router.delete('/borrar', function (req, res, next) {

    let jwt = req.cookies.jwt
    const id = req.query.id;
    const nombre = req.query.nombre;

    var url = 'http://localhost:8090/restaurantes/' + id + '/platos/' + nombre;

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
        res.send(id)
    });

});

router.put('/actualizar', function (req, res, next) {

    let jwt = req.cookies.jwt
    const id = req.query.id;
    const nombreP = req.query.nombre;

    let nombre = req.body.nombre
    let descripcion = req.body.descripcion
    let precio = req.body.precio

    var url = 'http://localhost:8090/restaurantes/' + id + '/platos/' + nombreP;

    var data = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio
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
        res.send(id)
    });

});

router.post('/register', function (req, res, next) {

    console.log("ENRTO AL ROUTE DE PLATO");

    let usuario = req.cookies.nombre;
    let restaurante = req.body.restaurante;
    let plato = req.body.plato;
    let descripcion = req.body.descripcion;

    console.log("Nombre recibido: " + usuario);
    console.log("Usuario: " + usuario);
    console.log("Restaurante: " + restaurante);
    console.log("Plato: " + plato);
    console.log("Descripción: " + descripcion);

    helper_mysql.getConnection()
        .then(
            con => {
                return helper_mysql.registerIncidencia(con, usuario, restaurante, plato, descripcion)
            })
        .then(result => {
            for (ele in result) console.log(ele)
            if (result[0].affectedRows > 0)
                res.send('Incidencia enviada')
            else
                res.send('Error al enviar la incidencia')
        }
        )
        .catch(error => { console.log(error) })
});

router.get('/incidencias', function (req, res, next) {
    let restaurante = req.query.restaurante;
    let plato = req.query.plato;

    helper_mysql.getConnection()
        .then(con => helper_mysql.getIncidencias(con, restaurante, plato))
        .then(incidencias => {
            res.send(incidencias);
        })
        .catch(error => {
            console.log(error);
            res.send('Error al obtener las incidencias');
        });
});

router.delete('/deleteIncidenciasByPlato/:plato/:restaurante', function (req, res, next) {
    console.log("ESTOY PARA BORRAR LA INCIDENCIA EN ROUTE");
    const plato = req.params.plato;
    const restaurante = req.params.restaurante;

    helper_mysql.getConnection()
        .then(connection => {
            return helper_mysql.deleteIncidenciasByPlato(connection, plato, restaurante);
        })
        .then(result => {
            res.send('Incidencias eliminadas correctamente');
        })
        .catch(error => {
            console.log(error);
            res.send('Error al eliminar las incidencias');
        });
});

router.delete('/deleteIncidenciasByRestaurante/:restaurante', function (req, res, next) {
    console.log("ESTOY PARA BORRAR LA INCIDENCIA EN ROUTE");
    const restaurante = req.params.restaurante;

    helper_mysql.getConnection()
        .then(connection => {
            return helper_mysql.deleteIncidenciasByRestaurante(connection, restaurante);
        })
        .then(result => {
            res.send('Incidencia eliminada correctamente');
        })
        .catch(error => {
            console.log(error);
            res.send('Error al eliminar la incidencia');
        });
});

module.exports = router;