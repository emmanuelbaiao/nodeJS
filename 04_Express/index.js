<<<<<<< HEAD
const path     = require('path')
const express  = require('express');
const app      = express();
const porta    = 3000; //porta para acesso ao servidor
const basePath = path.join(__dirname, 'templates');

app.get('/produtos', (requisicao, resposta)=>{
    resposta.sendFile("``")
=======
const express = require('express');
const app     = express();
const porta   = 3000; //porta para acesso ao servidor

app.get('/produtos', (requisicao, resposta)=>{
    resposta.send("Esta é minha primeira página utilizando o NODE.js")
>>>>>>> 196819b (configurado o express)
})

app.listen(porta, ()=> {
    console.log("A aplicação está rodando na porta "+porta);
})

