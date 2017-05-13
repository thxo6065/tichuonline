var mariadb = require('../database/mariadb');
var config = require('../config');

module.exports = function (app) {
    mariadb.createPool(config.mariadb);
    mariadb.test(function (err) {
        if (err) {
            console.log("Failed to test MariaDB.");
            console.error(err);
        } else {
            console.log("MariaDB connection pool is created.");
        }
    });
};