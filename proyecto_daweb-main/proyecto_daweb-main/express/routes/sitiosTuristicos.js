var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database')
var request = require('request');

var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/xy', function (req, res, next) {

    console.log("ENtro al routee");

    const x = req.query.x;
    const y = req.query.y;

    let jwt = req.cookies.jwt
    console.log(jwt)

    var url = 'http://localhost:8090/restaurantes/sitiosTuristicos/' + x + "/" + y;

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
        //console.log(body);
        res.send(body);
    });

});

router.put('/establecer', function (req, res, next) {
    let jwt = req.cookies.jwt;
    const id = req.query.id;
    var url = 'http://localhost:8090/restaurantes/' + id + '/sitiosTuristicos';

    var clientServerOptions = {
        uri: url,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(req.body.sitiosTuristicos) // Enviar solo el arreglo req.body.sitiosTuristicos en lugar de todo el objeto req.body
    };

    console.log(req.body.sitiosTuristicos); // Imprimir el contenido del arreglo en la consola

    request(clientServerOptions, function (error, response, body) {
        console.log(response.statusCode);
        if (error) {
            return next(error);
        }
        res.send(body);
    });
});





module.exports = router;