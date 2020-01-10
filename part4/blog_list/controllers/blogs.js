const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {

  const blogs = await Blog.find({})
  res.status(200).json(blogs.map(b => b.toJSON()))

});

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
 try{
    if (blog){
      res.status(200).json(blog.toJSON())
    }else{
      next()
    }
 }catch(err){
   next(err)
 }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const updatedBlog = await Blog.findByIdAndUpdate( req.params.id, {likes: req.body.likes}, { new: true, runValidators: true})
  res.status(200).json(updatedBlog.toJSON())
})

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

blogsRouter.delete('/:id', async (req, res, next) => {
  try{
    const result = await Blog.findByIdAndRemove(req.params.id)
    if(result){res.status(204).end()}
    else{
      next()
    }
  }
  catch (err) {
    next(err)
  }
  
})

module.exports = blogsRouter;
