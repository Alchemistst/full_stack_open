const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Invalid token.'
    })
  }
  logger.error(err.message);

  return next(err);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer')){
    req.token = auth.substring(7)
  }
  return next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor };
