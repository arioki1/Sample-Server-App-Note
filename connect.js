const mysql = require('mysql');

const connect = mysql.createConnection({
    host: process.env.HOST_MYSQL,
    user: process.env.USERNAME_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DATABASE_MYSQL
});

connect.connect(function (err) {
    if (err) throw err
});

module.exports = connect;