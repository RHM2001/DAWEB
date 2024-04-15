var express = require('express');
var router = express.Router();
var helper_mysql = require('../javascripts/helper-database')
var request = require('request');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', function (req, res, next) {

    let nombre = req.cookies.nombre
  
    console.log("Nombre recibido :" + nombre)
  
    helper_mysql.getConnection()
      .then(
        con => {
          return helper_mysql.registerUser(con, nombre)
        })
      .then(result => {
        for (ele in result) console.log(ele)
        if (result[0].affectedRows > 0)
          res.send('Usuario registrado')
        else
          res.send('Error al registrar usuario')
      }
      )
      .catch(error => { console.log(error) })
});

router.get('/logout', function (req, res, next) {

  console.log(req.cookies.nombre)
  console.log(req.cookies.jwt)
  
  res.clearCookie('jwt');
  res.clearCookie('nombre');

  res.sendStatus(200);


});
  
module.exports = router;