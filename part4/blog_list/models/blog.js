const mongoose = require('mongoose')
const config = require('../utils/config')

//TODO: Add validation and catch errors on middleware.js

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
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