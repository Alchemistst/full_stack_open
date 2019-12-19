const mongo = require("mongoose")
const uniVal = require("mongoose-unique-validator")

const url = process.env.MONGODB_URI

//Connection to database
mongo.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify : false})
    .then(res => {console.log("Successfully connected to database.")})
    .catch(res => {
        console.log("Unable to connect to database. Check password.")
        process.exit(1)
    }
    )

//Schema declaration
const personSchema = new mongo.Schema({
    name: { 
        type: String, 
        unique: true,
        minlength: 3,
        required: true
     },
    number: {
        type: String,
        minlength: 8,
        validate:
        {
            validator: v => {
                return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/.test(v)
            },
            message: props => {`${props.value} is not a valid phone number.`},
            kind: "nondigit"
        },
        required: true
    }
})

//Appling plugins
personSchema.plugin(uniVal)

//Modifing toJSON method from objects so id is formated as string
personSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongo.model("Person", personSchema)