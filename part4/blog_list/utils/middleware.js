const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  return next(err);
};

module.exports = { unknownEndpoint, errorHandler };
