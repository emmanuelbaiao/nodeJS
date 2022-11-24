const express    = require ('express');
const exphbs     = require('express-handlebars');
const conn       = require('./db/conn');
const app        = express('');

const Clube      = require('./models/Clube')

//config template engine handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');

//configuração para utilizar os formulários
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//rotas do clube
app.post('/clube/save', async (req,res)=>{
    const nome = req.body.nome;
    let status = req.body.status;

    if(status === 'on'){
        status = true;
    }else{
        status = false;
    }

    await Clube.create({nome, status});

    res.redirect('/clubes');
})

app.get('/clubes', (req,res)=>{
    res.render('clubes');
})

app.get('/', (req, res) =>{
    res.render('home');
})

conn.sync().then(()=>{
    app.listen(3000);
}).catch((error) => {
    console.log(error);
});
