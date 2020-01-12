const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

//Schema definition and validation
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passhash: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const User = mongoose.model('User', userSchema);

module.exports = User;

