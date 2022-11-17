const express = require('express');
const exphbs  = require('express-handlebars');
const app     = express();

//define o handlebars como template engine da nossa aplicação
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');



//Rota principal da aplicação
app.get('/produtos', (req,res) =>{
    const produtos = [
        {descricao: "Arroz", preco: 23.99, promocao: true},
        {descricao: "Feijão", preco: 10.99, promocao: false},
        {descricao: "Óleo", preco: 7.99, promocao: true},
        {descricao: "Açúcar", preco: 17.99, promocao: false},
        {descricao: "Farinha de Trigo", preco: 8.99, promocao: true},
        {descricao: "Shampoo", preco: 10.99, promocao: false},
        {descricao: "Condicionador", preco: 11.99, promocao: true}
    ]

    res.render('produtos', {produtos});
})

app.get('/', (req,res) =>{
    const usuario = {
        nome: "Emmanuel",
        email: "emmanuelbaiao@gmail.com",
        dataNascimento: "23/01/1992"
    }

    

    const usuarioLogado = true;

    const array = [1,2,3,4,5,6,7]

    const animal ={
        nome: "Totó",
        idade: "13 anos",
        raca: "Pastor Alemão"
    }

    res.render('home', {usu: usuario, usuarioLogado, array, animal});
})




//executar o servidor
app.listen(3000);