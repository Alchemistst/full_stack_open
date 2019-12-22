const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');

// Middleware initialization
app.use(cors());
app.use(bodyParser.json());

// Morgan inizialization
app.use(morgan((tokens, req, res) => {
  const post = JSON.stringify(res.req.body);
  const avoidAnnoyingBrackets = post !== '{}' ? post : '';

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    avoidAnnoyingBrackets,
  ].join(' ');
}));

// Routes are handled by blogsRouter object on /controlers/blogs.js
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
