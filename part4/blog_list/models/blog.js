const mongoose = require('mongoose')
const config = require('../utils/config')

//TODO: Add validation and catch errors on middleware.js
//Schema definition and validation
const blogSchema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)
  
  const mongoUrl = config.MONGODB_URI   
  mongoose
    .connect(mongoUrl, 
      { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(console.log('Successfylly connected to database.'))
    .catch(res => {
      console.log(`Something went wrong... ${res}`)
      process.exit(1)
    })

module.exports = Blog 