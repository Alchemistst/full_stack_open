const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {

  const blogs = await Blog.find({}).populate('user',  { passhash: 0, blogs: 0 })
  res.status(200).json(blogs.map(b => b.toJSON()))

});

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate('user', { passhash: 0, blogs: 0 })
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

  const {token} = req

  let decodedToken

  try{ 
    decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
      return res.status(401).json({
        error: 'Invalid or missing token.'
      })
    }
  }catch(err){
    return next(err)
  }
  

  const userInSession = decodedToken.id

  const { body } = req;

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: userInSession,
      likes: body.likes || 0
  });
  
  
  
  try{
    const result = await blog.save()

    const updatedUser = await User.findById(userInSession)
    updatedUser.blogs.push(result.toJSON().id)
    await User.findByIdAndUpdate(userInSession, { blogs: updatedUser.blogs }, { new: true, runValidators: true})

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

