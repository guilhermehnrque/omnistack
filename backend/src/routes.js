const { Router } = require('express')
const DevController = require('./app/controllers/DevController')
const SearchController = require('./app/controllers/SearchController')
const AuthController = require('./app/controllers/AuthController')
const UserscController = require('./app/controllers/UsersController')
const authMiddleware = require('./app/middleware/auth')
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

// User Routes
routes.post('/auth/register', AuthController.store)
routes.post('/auth/login', AuthController.authenticate)

// Get all users
routes.use(authMiddleware).get('/users', UserscController.index)
module.exports = routes