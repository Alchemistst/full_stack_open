const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {

  const blogs = await Blog.find({})
  res.status(200).json(blogs.map(b => b.toJSON()))

});


blogsRouter.post('/', async (req, res, next) => {

  const { body } = req;

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    });

  try{
    const result = await blog.save()
    res.status(201).json(result)  
  } catch (err) {
    next(err)
  }
  
});

module.exports = blogsRouter;
