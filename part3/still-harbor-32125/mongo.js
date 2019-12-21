const mongo = require("mongoose")
const ids = require("shortid")

if (process.argv.length !== 3 && process.argv.length !== 5){
    //Handling of insufficient number of arguments
    console.log("Usage 1: node <file> <database_password> => Shows all registries")
    console.log("Usage 2: node <file> <database_password> <name> <phonenumber> => Adds new registry")
    process.exit(1)
}

//Connection to database
const pass = process.argv[2]
const url = `mongodb+srv://fullstack:${pass}@cluster0-na9ux.mongodb.net/phonebook?retryWrites=true&w=majority`
mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => {console.log("Successfully connected to database.")})
    .catch(res => {
        console.log("Unable to connect to database. Check password.")
        process.exit(1)
    }
    )

//Schema declaration
const personSchema = new mongo.Schema({
    name: String,
    number: String,
    id: String
})

//Database model
const Person = mongo.model("Person", personSchema)

if (process.argv.length === 3){
    //With 3 arguments it shows all registries on the database
    Person.find({}).then(res => {
        res.forEach( per => {
            console.log(per)
        })
        mongo.connection.close()
        process.exit(0)
    })
}

//New person staged for submission to database
const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: ids.generate()
})

//Saving new person
person.save().then(res => {
    console.log("Person added to the phonebook!")
    mongo.connection.close()
})
