require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const dexter = require('morgan');
const cors = require('cors');
const Person = require('./models/person'); // Database model


app.use(cors());
app.use(express.static('build'));

// Morgan setup for logging requests
app.use(dexter((tokens, req, res) => {
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

app.use(bodyParser.json());


// Code for diferent URL paths

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the PERSONS API!</h1>');
});

// /api/persons sends the array of all persons on the server
app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then((result) => res.json(result.map((person) => person.toJSON())))
    .catch((err) => next(err));
});

// /info sends HTML page info about how many contacts at timestamp
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      const message = count === 1
        ? `Phonebook has info for ${count} person`
        : `Phonebook has info for ${count} people`;
      res.send(
        `
                <p>${message}</p>
                <p>${date}</p>
                `,
      );
    })
    .catch((err) => next(err));
});

// /api/persons/:id handles the request for a specific person
app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).json(person.toJSON());
      } else {
        next();
      }
    })
    .catch((err) => next(err));
});

// Implementation of DELETE requests for a single person
app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params;

  Person
    .findByIdAndRemove(id)
    .then((result) => {
      if (result) {
        res.status(204).end();
      } else {
        next();
      }
    })
    .catch((err) => next(err));
});

// Handling of POST requests to add new persons
app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson.toJSON());
    }).catch((err) => next(err));

  dexter.token('type', res.body);
});

// Handling PUT requests to update persons
app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.status(200).json(updatedPerson.toJSON());
      } else {
        next();
      }
    })
    .catch((err) => next(err));
});


// Middleware error handlers

// -> Handler for requests with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// -> Handler for requests with result to errors
const errorHandler = (err, req, res, next) => {
  if (err.message) console.error(err.message);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    // Notify of malformated ids
    return res.status(400).send({ error: 'Malformatted id.' });
  }
  // Validation errors
  if (err.name === 'ValidationError') {
    // Name validation errors
    if (err.errors.name) {
      // Non-duplicates
      if (err.errors.name.kind === 'unique') { return res.status(400).send({ error: 'Duplicate entry.' }); }
      // Minlength requirements
      if (err.errors.name.kind === 'minlength') { return res.status(400).send({ error: 'Name length is too short.' }); }
      // Not missing information
      if (err.errors.name.kind === 'required') { return res.status(400).send({ error: 'Missing name field.' }); }
    }
    // Number validation errors
    if (err.errors.number) {
      // Minlength requirements
      if (err.errors.number.kind === 'minlength') { return res.status(400).send({ error: 'Phone number legnth is too short.' }); }
      // No letters
      if (err.errors.number.properties.kind === 'nondigit') { return res.status(400).send({ error: 'Phone number contains forbiden characters.' }); }
      // Not missing information
      if (err.errors.number.kind === 'required') { return res.status(400).send({ error: 'Missing number field.' }); }
    }
  }

  return next(err);
};

app.use(errorHandler);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
