const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router()

// Tipos de Parâmetros
// Query Params: request.quuery
// Route Params: request.params
// Body: 

// Cadastro de Dev - Pode demorar para responder
routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)

routes.get('/search', SearchController.index)

module.exports = routes