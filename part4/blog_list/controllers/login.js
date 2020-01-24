const loginRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { body } = req;

  const user = await User.findOne({ username: body.username });

  const isPassCorrect = user === null
    ? false
    : await bcrypt.compare(body.pass, user.passhash);

  if (!(user && isPassCorrect)) {
    res.status(401).json({
      error: 'Wrong username or password.',
    });
  }

  const token = jwt.sign({
    username: user.username,
    id: user._id,
  }, process.env.SECRET);

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
