const {Sequelize} = require('sequelize');
const sequelize   = new Sequelize('db_comum', 'root', 'ASD3210asd@', {host: 'localhost', dialect:'mysql'});

try{
    sequelize.authenticate();
    console.log('Banco de Dados Conectado com sucesso!');
} catch (error) {
    console.log('Erro ao conectar com o DB' + error);
}

module.exports = sequelize;