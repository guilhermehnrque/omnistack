const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router()

// Tipos de Parâmetros
// Query Params: request.quuery
// Route Params: request.params
// Body: 

routes.get('/', (req, res) => {
    return res.json("Service started")
})

// Cadastro de Dev
routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)
routes.put('/dev', DevController.update)
routes.delete('/dev', DevController.delete)

routes.get('/search', SearchController.index)

module.exports = routes