var mysql = require('mysql');

var mariadb = {};
var pool;

mariadb.get = function (callback) {
    pool.getConnection(callback);
};

mariadb.createPool = function (config) {
    pool = mysql.createPool(config);
};

mariadb.test = function (callback) {
    mariadb.get(function (err, con) {
        if (con) {
            con.release();
        }

        callback(err);
    });
};

module.exports = mariadb;