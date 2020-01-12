const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const config = require('./utils/config');
const mongoose = require('mongoose')

// Middleware initialization
app.use(cors());
app.use(bodyParser.json());

logger.morganInit(app)

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


// Routes are handled by blogsRouter object on /controlers/blogs.js
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
