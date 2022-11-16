const express = require('express');
const exphbs  = require('express-handlebars');
const app     = express();

//define o handlebars como template engine da nossa aplicação
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');



//Rota principal da aplicação
app.get('/', (req,res) =>{
    let nome = "Emmanuel"
    res.render('home', {nome});
})


//executar o servidor
app.listen(3000);