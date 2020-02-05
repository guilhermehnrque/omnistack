const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

mongoose.connect('mongodb+srv://wiiki25:Wwiiki1507@cluster0-bzon1.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
app.use(cors())
app.use(express.json())
app.use(routes)
console.log("[Backend] - Service started at port 3333")
app.listen(3333)