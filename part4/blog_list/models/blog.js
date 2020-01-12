const mongoose = require('mongoose');
const config = require('../utils/config');
const logger = require('../utils/logger')

// Schema definition and validation
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  .then(logger.info('Successfully connected to database.'))
  .catch((res) => {
    logger.error(`Something went wrong... ${res}`);
    process.exit(1);
  });



module.exports = Blog;
