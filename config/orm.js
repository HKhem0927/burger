var connection = require('../config/connection.js');

function objToSql(ob) {

  var arr = [];

  for (var key in ob) {
    if (ob.hasOwnProperty(key)) {
      arr.push(key + '=' + ob[key]);
    }
  }

  return arr.toString();
}


var orm = {


  all: function(table, cb) {
    var queryStr = 'SELECT * FROM ' + table + ';';
    connection.query(queryStr, function(err, res){
      if (err) throw err;
      cb(res);
    })
  },


  create: function(table, cols, vals, cb){

    var queryStr = 'INSERT INTO ' + table;

    queryStr += ' (';
    queryStr +=  cols.toString();
    queryStr += ') VALUES ("';
    queryStr += vals;
    queryStr += '") ';

    connection.query(queryStr, function(err, res){
      if (err) throw err;
      cb(res);
    })
  },


  update: function(table, objColVals, condition,cb){

    var queryStr = 'UPDATE ' + table;

    queryStr += ' SET ';
    queryStr += objToSql(objColVals);
    queryStr += ' WHERE ';
    queryStr += condition;

    connection.query(queryStr, function(err, res){
      if (err) throw err;
      cb(res);
    })
  }
};

module.exports = orm;