const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_usuario123",
    password: "Bx!cb572xphR@u#",
    database: "freedb_siste"
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

module.exports = db;
