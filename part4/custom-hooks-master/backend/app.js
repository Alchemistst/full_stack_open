const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongo = require('mongoose')
const config = require('./utils/config')

//Routers
const notesRouter = require('./controllers/notes')
const phonebookRouter = require('./controllers/phonebook')

//App init
const app = express()

//Pre-Middleware
app.use(cors())
app.use(bodyParser.json())

//Database init
const mongo_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongo
    .connect(config.MONGODB_URL, mongo_config)
    .then(
        console.log('Connection to database succeeded!')
    ).catch(err => {
        next(err)
        process.exit(1)
    })

//Routers init
app.use('/api/notes', notesRouter)
app.use('/api/phonebook', phonebookRouter)

module.exports = app