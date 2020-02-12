const mongo = require('mongoose')

const numberSchema = new mongo.Schema({
    name: String,
    number: String
})

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
});

const Phonebook = mongo.model('Number', numberSchema)

module.exports = Phonebook