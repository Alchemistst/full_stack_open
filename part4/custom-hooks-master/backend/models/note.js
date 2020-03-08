const mongo = require('mongoose')

const noteSchema = new mongo.Schema({
    note: String,
    date: Date
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
});

const Note = mongo.model('Note', noteSchema)

module.exports = Note