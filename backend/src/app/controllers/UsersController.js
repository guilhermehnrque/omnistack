const User = require('../models/User')

// Middleware de token
module.exports = {
    async index(request, response) {
        // console.log({request})
        console.time('Buscando usuário')
        const users = await User.find()

        console.timeEnd('Buscando usuário')
        return response.json({ users, user: request.userId })

        // const users = await User.find()
        // return response.json({users, user: request.userId})
    }
}
