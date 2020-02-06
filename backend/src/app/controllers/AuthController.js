const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

function generateToken(params = {}) {
    return jwt.sign(
        { params },
        authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async store(request, response) {
        const { name, email, password } = request.body
        let user = await User.findOne({ email })

        if (!user) {
            try {
                user = await User.create({ name, email, password })
                user.password = undefined
                return response.json({ user, token: generateToken({ id: user._id }) })
            }
            catch (err) {
                return response.status(400).json({ error: err })
            }
        } else {
            return response.status(400).json({ message: "User already registered" })
        }

    },

    async authenticate(request, response) {
        const { email, password } = request.body
        try {
            const user = await User.findOne({ email }).select('+password')

            if (!user) {
                return response.status(400).send({ error: "User not found" })
            }

            if (!await bcrypt.compare(password, user.password)) {
                return response.status(400).send({ error: "Invalid password" })
            }

            user.password = undefined
            return response.json({ user, token: generateToken({ id: user._id }) })
        }
        catch (err) {
            return response.status(400).send({ error: err })
        }
    }
}