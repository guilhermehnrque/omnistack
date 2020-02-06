const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization

    // Token verirication
    if (!authHeader) {
        return response.status(401).json({ error: "No token provided" })
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
        return response.status(401).json({ error: "Token Error" })
    }

    const [scheme, token] = parts

    if (!/^Bearer$^/i.test(scheme)) {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                return response.status(401).json({ error: "Token invalid" })
            }
            request.userId = decoded.params.id
            return next()
        })

    } else {
        return response.status(401).json({ error: "Token malformatted" })
    }
}