var express = require('express')
var router = express.Router()
var request = require('request');

var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// servicio prueba para usar en frontend React
router.get('/express_backend', (req, res) => {

  let jwt = req.headers.authorization
  console.log(jwt)

  var url = 'http://localhost:8090/restaurantes/topTres';


  var clientServerOptions = {
    uri: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwt
    }
  }

  request(clientServerOptions, function (error, response, body) {
    if (response.statusCode !== 200) {
      return (new Error('La solicitud no fue exitosa'));

    }
    console.log(body);
    res.send(body);
  });

});

module.exports = router;
