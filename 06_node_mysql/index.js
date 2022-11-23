const express = require('express');                   //importando o modulo express
const exphbs  = require('express-handlebars');        //importando módulo handlebars
const conn    = require('./db/conn')                  //conexão POOL mysql
const app     = express();                            //iniciando o método express

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

//rota de usuários
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

//rota de usuários individual
app.get('/usuario/:id', (req,res)=>{
    const id = req.params.id;

    const sql =  `select id_usuario, 
                         nome_usuario, 
                         endereco_usuario, 
                         email_usuario, 
                         data_nascimento_usuario 
                    from usuario 
                    where id_usuario = ${id}`;

    conn.query(sql, (error, result) =>{
        if(error){
            console.log(error);
            return
        }
        const usuario = result[0]
        // console.log(usuario);
        res.render('usuario', {usuario});
    })
})

//rota para editar usuário
app.get('/usuario/edit/:id', (req,res)=>{
    const id = req.params.id;

    const sql =  `select id_usuario, 
                         nome_usuario, 
                         endereco_usuario, 
                         email_usuario, 
                         data_nascimento_usuario 
                    from usuario 
                    where id_usuario = ${id}`;

    conn.query(sql, (error, result) =>{
        if(error){
            console.log(error);
            return
        }
        const usuario = result[0]
        // console.log(usuario);
        res.render('usuario-edit', {usuario});
    })
})

//rota do botão atualizar usuário
app.post('/usuario/edit/save', (req,res)=>{
    const id = req.body.id_usuario;
    const nome = req.body.nome;
    const endereco = req.body.endereco;
    const email = req.body.email;
    const dataNascimento = req.body.dataNascimento;
    
    const sql = `UPDATE usuario 
                    SET nome_usuario = '${nome}', 
                    endereco_usuario = '${endereco}',
                    email_usuario = '${email}',
                    data_nascimento_usuario = '${dataNascimento}'
                    WHERE id_usuario = ${id}`;

        conn.query(sql, (erro) =>{
            if(erro){
                console.log(erro);
                return
            }
            res.redirect('/usuarios')
            //ou
            //res.redirect('/usuarios/:id')
        })
})


//rota para deletar usuário
app.get('/usuario/delete/:id', (req,res)=>{
    const id = req.params.id;

    const sql =  `delete
                    FROM usuario
                    WHERE id_usuario = ${id}`;

    conn.query(sql, (error, result) =>{
        if(error){
            console.log(error);
            return
        }
        // console.log(usuario);
        res.redirect('/usuarios');
    })
})

//rota para cadastrar usuário (botão cadastro)
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

//porta para o servidor
app.listen(3000, ()=>{
    console.log("O servidor está rodando.")
})

// FOI PARA O ARQUIVO CONN.JS
// base para conectar
// const conn = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'ASD3210asd@',
//     database: 'db_comum'
// })

// FOI PARA O ARQUIVO CONN.JS
// conn.connect ((erro) => {
//     if (erro){
//         console.log(erro);
//         return
//     }
//     console.log("Conectou no banco de dados!");

//     app.listen(3000, ()=>{
//         console.log("O servidor está rodando.")
//     })
// })








