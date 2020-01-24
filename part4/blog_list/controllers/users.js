const userRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');


userRouter.get('/', async (req, res) => {
  let result = await User.find({}).populate('blogs', { likes: 0, user: 0 });

  result = result.map((r) => {
    const a = r.toJSON();
    delete a.passhash;
    return a;
  });

  res.status(200).json(result);
});

userRouter.post('/', async (req, res, next) => {
  const { body } = req;

  if (!body.pass || !body.username) {
    return res.status(400).json({
      error: 'Missing username or password.',
    });
  }

  if (body.pass.length < 3 || body.username.length < 3) {
    return res.status(400).json({
      error: 'Username or password too short.',
    });
  }

  const user = new User({
    name: body.name,
    passhash: bcrypt.hashSync(body.pass, 10),
    username: body.username,
  });

  try {
    const result = await user.save();
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = userRouter;
