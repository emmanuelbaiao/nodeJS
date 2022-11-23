const mysql = require ('mysql');


//conexão com o banco
const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ASD3210asd@',
    database: 'db_comum'
});

module.exports = conn;