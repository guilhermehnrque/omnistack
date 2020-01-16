const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async store(request, res) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })
        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_username}`)

            let { name = login, avatar_url, bio } = response.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            // Cadastrar
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
        return res.json(dev)
    },
    async index(request, response){
        const devs = await Dev.find()

        return response.json(devs)
    }
}