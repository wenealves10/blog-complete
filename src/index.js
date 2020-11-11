require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('../database/database')

// Routers da Aplicação
const categoriesController = require('../categories/CategoriesController')
const articlesController = require('../articles/ArticlesController')

// objeto de configuração da aplicação
const configs = {
    port: process.env.PORT || 8080,
}

// configurando o express
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// conexão com o banco de dados
connection
  .authenticate()
     .then((result) => {
         console.log('connection success!')
     }).catch((err) => {
         console.log('connection erro: '+err)
     });

// rotas principal da aplicação 
app.get('/',(req, res) =>{
    res.render('index')
})

// rotas categorias
app.use('/',categoriesController)

// rotas artigos
app.use('/',articlesController)

// porta da aplicação
app.listen(configs.port, () => {
    console.log(`Server port ${configs.port}`)
})

