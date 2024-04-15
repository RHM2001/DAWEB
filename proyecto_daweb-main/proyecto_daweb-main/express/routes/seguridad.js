var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database')
var request = require('request');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/comprobar', (req, res) => {
    
    let jwt = req.cookies.jwt
    let codigoRespuesta
    
    console.log("hola");

    if (jwt == null)
        codigoRespuesta = 401;

    codigoRespuesta = 200;
    res.send(codigoRespuesta);
});

module.exports = router;