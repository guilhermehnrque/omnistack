const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

// Middleware de token
module.exports = {
    async index(request, response){
        const users = await User.find()
        return response.json({users, user: request.userId})
    }
}
