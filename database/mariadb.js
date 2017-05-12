var mysql = require('mysql');

var mariadb = {};
var pool;

mariadb.init = function(config) {
    pool = mysql.createPool(config.mariadb);
}

mariadb.get = function(callback) {
    pool.getConnection(callback);
}

module.exports = mariadb;