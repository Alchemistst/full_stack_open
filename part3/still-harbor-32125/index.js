const express = require("express")
const app = express()
const ids = require("shortid") //Instead of using Math random I decided to use short id for ids. Much better.
const bodyParser = require("body-parser")
const dexter = require("morgan")
const cors = require("cors")

app.use(cors())
app.use(express.static("build"))
app.use(dexter(function (tokens, req, res) {
    
    const post = JSON.stringify(res.req.body) 
    const avoidAnnoyingBrackets = post != "{}" ? post : ""
    
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      avoidAnnoyingBrackets
    ].join(' ')
  }))

app.use(bodyParser.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: ids.generate()
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: ids.generate()
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: ids.generate()
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: ids.generate()
      }
]



app.get("/", (req, res) =>{
    res.send("<h1>Welcome to the PERSONS API!</h1>")
})

// /api/persons sends the array of all persons on the server
app.get("/api/persons", (req,res) => {
    res.json(persons)
})

// /info sends HTML page info about how many contacts at timestamp
app.get("/info", (req, res) => {
    let people = persons.length
    let date = new Date()
    let message = people === 1 
    ?  `Phonebook has info for ${people} person`
    : `Phonebook has info for ${people} people`
    res.send(
        `
        <p>${message}</p>
        <p>${date}</p>
        `
    )
})

// /api/persons/:id handles the request for a specific person
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(per => per.id === id)

    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

// Implementation of DELETE requests for a single person
app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(per => per.id !== id)

    res.status(204).end()
})

// Handling of POST requests for adding new persons
app.post("/api/persons", (req, res) => {
    const body = req.body
    
    // Error handling for missing information
    if (!body.name || !body.number){
        return res.status(400).json({
            error: "Name or number missing."
        })
    }

    //Error handling for already existing entry
    if (persons.find(per => per.name === body.name)){
        return res.status(400).json({
            error: "Name must be unique."
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: ids.generate()
    }

    persons = persons.concat(person)

    res.json(person)

    dexter.token("type", (req, res) => res.body )
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
