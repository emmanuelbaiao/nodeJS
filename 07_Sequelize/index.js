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

//rota dos clubes
app.get('/clubes', async (req,res)=>{
    const clubes = await Clube.findAll({raw: true});
   
    res.render('clubes', {clubes});
})

//rota para exibir clube individualmente
app.get('/clube/:id', async (req, res)=>{
    const id = req.params.id;

    const clube = await Clube.findOne({raw:true, where: {id: id}});

    res.render('clube', {clube});
})

//rota para excluir os clubes
app.get('/clube/delete/:id', async (req,res)=>{
    const id = req.params.id;

    await Clube.destroy({where: {id: id}});

    res.redirect('/clubes');
})

//rota de edição
app.get('/clube/edit/:id', async (req,res)=>{
    const id   = req.params.id;

    const clube = await Clube.findOne({raw: true, where: {id: id}});

    res.render('clube-edit', {clube});
});

//rota para finalizar edição
app.post('/clube/edit/save', async (req,res)=>{
    const id = req.body.id;
    const nome = req.body.nome;
    let status = req.body.status;

    if (status === 'on'){
        status = true;
    }else{
        status = false;
    }

    const clubeAlterado = {id, nome, status}

    //maneira básica
    // const  clubeAlterado = {
    //     id: id,
    //     nome: nome,
    //     status: status
    // }
    
    await Clube.update(clubeAlterado, {where:{id: id}})

    res.redirect('/clubes');
})


app.get('/', (req, res) =>{
    res.render('home');
})

conn.sync().then(()=>{
    app.listen(3000);
}).catch((error) => {
    console.log(error);
});
