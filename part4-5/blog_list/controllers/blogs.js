const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { passhash: 0, blogs: 0 });
  res.status(200).json(blogs.map((b) => b.toJSON()));
});

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('user', { passhash: 0, blogs: 0 });
  try {
    if (blog) {
      res.status(200).json(blog.toJSON());
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog
    .findByIdAndUpdate(
      req.params.id,
      { likes: req.body.likes },
      { new: true, runValidators: true },
    );
  res.status(200).json(updatedBlog.toJSON());
});

blogsRouter.post('/', async (req, res, next) => {
  const { token } = req;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Invalid or missing token.',
      });
    }
  } catch (err) {
    return next(err);
  }


  const userInSession = decodedToken.id;

  const { body } = req;

  const blog = new Blog({
    title: body.title,
    author: body.author || 'anonymous',
    url: body.url,
    user: userInSession,
    likes: body.likes || 0,
  });


  try {
    let result = await blog.save();

    Blog.populate(result, {
      path: 'user',
      select: {passhash: 0, blogs: 0}
    }, (err, res) => {
      if (err) throw err
      result = res
    }  );

    const updatedUser = await User.findById(userInSession);
    updatedUser.blogs.push(result.toJSON().id);
    await User.findByIdAndUpdate(
      userInSession,
      { blogs: updatedUser.blogs },
      { new: true, runValidators: true },
    );

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findById(req.params.id);
    if (!result) {
      return next();
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({
        error: 'Invalid or missing token.',
      });
    }

    if (result.user.toString() !== decodedToken.id.toString()) {
      return res.status(401).json({
        error: 'Unauthorized.',
      });
    }

    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    if (!deletedBlog) { return next(); }

    const updatedUser = await User.findById(decodedToken.id);

    const index = updatedUser.blogs
      .map((b) => b.toString())
      .indexOf(result.toJSON().id);
    updatedUser.blogs.splice(index, 1);
    await User.findByIdAndUpdate(
      decodedToken.id,
      { blogs: updatedUser.blogs },
      { new: true, runValidators: true },
    );

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

module.exports = blogsRouter;
