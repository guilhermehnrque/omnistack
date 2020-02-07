const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/mail')

const transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: { user: user, pass: pass }
});


const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: './src/resources/mail/',
        layoutsDir: './src/resources/mail/',
        defaultLayout: 'default.html',
    },
    viewPath: './src/resources/mail/',
    extName: '.html',
};

transport.use('compile', hbs(handlebarOptions))

module.exports = transport