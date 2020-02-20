const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')

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
                return response.status(400).json({ error: "User not found" })
            }

            if (!await bcrypt.compare(password, user.password)) {
                return response.status(400).json({ error: "Invalid password" })
            }

            user.password = undefined
            return response.json({ user, token: generateToken({ id: user._id }) })
        }
        catch (err) {
            return response.status(400).json({ error: err })
        }
    },

    async password_recovery(request, response) {
        const { email } = request.body
        try {
            const user = await User.findOne({ email })

            if (!user) {
                return response.status(400).json({ error: "User not found" })
            }

            // Gerar token para resertar password
            const token = crypto.randomBytes(20).toString('hex')
            // Tempo de expiração
            const now = new Date()
            now.setHours(now.getHours() + 1)

            // Adicionando o token e seu tempo de expiração
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })
            // Envio de email
            mailer.sendMail({
                to: email,
                from: 'guilherme.pereira@extrabom.com.br',
                template: 'auth/forgot_password',
                context: { token },
            }, (err) => {
                console.log(err)
                if (err) {
                    return response.status(400).json({ error: "Cannot send forgot password email" })
                } else {
                    return response.send(200)
                }

            })
        }
        catch (err) {
            console.log(err)
            return response.status(400).json({ error: "Error on forgot password, try again" })
        }
    },

    async reset_password(request, response) {
        const { email, token, password } = request.body

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpire')

            if (!user) {
                return response.status(400).json({ error: "User not found" })
            }
            

            if (token !== user.passwordResetToken) {
                return response.status(400).json({ error: "Invalid token" })
            }
                        const now = new Date()
            if (now > user.passwordResetExpires) {
                return response.status(400).json({ error: "Token expired, generate a new token" })
            }

            // Atualizar a password
            user.password = password

            await user.save()

            return response.status(200).json("Password updated")

        } catch (err) {
            return response.status(400).json({ error: "Cannot reset password" })
        }
    }
}