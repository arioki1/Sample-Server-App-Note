const mysql = require('mysql');

const database = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    user: process.env.USERNAME_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL
});

database.connect(function (err) {
    if (err) throw err
});
database.on('error', function (err) {
    console.log("[mysql error]", err);
});

module.exports = database;