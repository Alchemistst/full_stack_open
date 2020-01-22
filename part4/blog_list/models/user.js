const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator')

// Schema definition and validation
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passhash: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
});

userSchema.plugin(uniqueVal)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema);




module.exports = User;
