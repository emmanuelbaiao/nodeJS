const express = require('express');
const exphbs  = require('express-handlebars');
const mysql   = require('mysql');
const app     = express();

//configurando Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//configuração para aceitar arquivo CSS
app.use(express.static('public'));

//Middleware para receber dados dos formulários
app.use(
    express.urlencoded({extended: true})
)
app.use(express.json());

//rota de usuário
app.get('/usuarios', (req,res)=>{
    const sql = `SELECT * FROM usuario`;

    conn.query(sql, (erro, usuarios) =>{
        if(erro){
            console.log(erro);
            return
        }
        res.render('usuarios', {usuarios});
    })
})

//rota de clientes
app.get('/clientes', (req,res)=>{
    const sql = `SELECT * FROM clientes`;

    conn.query(sql, (erro, clientes) =>{
        if(erro){
            console.log(erro);
            return
        }
        res.render('clientes', {clientes});
    })
})

app.post('/usuario/save', (req,res)=>{
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const email = req.body.email;
    const dataNascimento = req.body.dataNascimento;
    
    const sql = `INSERT INTO usuario (nome_usuario, endereco_usuario, email_usuario, data_nascimento_usuario)
        VALUES ('${nome}', '${endereco}', '${email}', '${dataNascimento}')`;

        conn.query(sql, (erro) =>{
            if(erro){
                console.log(erro);
                return
            }
            res.redirect('/usuarios')
        })
})

app.post('/cliente/save', (req,res)=>{
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    const email = req.body.email;
    const dataNascimento = req.body.dataNascimento;
    
    const sql = `INSERT INTO clientes (nome_cliente, cpf_cliente, endereco_cliente, email_cliente, data_nascimento_cliente)
        VALUES ('${nome}', '${cpf}', '${endereco}', '${email}', '${dataNascimento}')`;

        conn.query(sql, (erro) =>{
            if(erro){
                console.log(erro);
                return
            }
            res.redirect('/clientes')
        })
})

//rota principal
app.get('/', (req,res) =>{
    res.render('home')
})

//base para conectar
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ASD3210asd@',
    database: 'db_comum'
})

//método para conexão ao banco, com função de callback
conn.connect ((erro) => {
    if (erro){
        console.log(erro);
        return
    }
    console.log("Conectou no banco de dados!");

    app.listen(3000, ()=>{
        console.log("O servidor está rodando.")
    })
})







