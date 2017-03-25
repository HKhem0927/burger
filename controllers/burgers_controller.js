var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
var path= require ('path');

router.get('/', function (req, res) {
  res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
  burger.all(function(data) {
    var burgObj = { burgers: data };
    
    res.render('index', burgObj);
  });
});

router.post('/burgers/insert', function(req, res){
  burger.create(['burger_name'], [req.body.burger_name], function(){
    res.redirect('/burgers');
  })  
})

router.put('/burgers/update/:id', function(req, res){
  var condition = 'id = ' + req.params.id;

  burger.update({devoured: true}, condition, function(){
    res.redirect('/burgers');
  })
}) 

module.exports = router;