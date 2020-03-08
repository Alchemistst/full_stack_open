const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id', async (req, res, next)=>{
    try{
        const blog = await blog.findById(req.params.id)
        if (blog){
            return res.status(200).json(blog.toJSON())
        }
        next()
        
    }catch (err){
        next(err)
    }
    
})

commentsRouter.post('/', async (req, res, next)=>{
    const { token } = req

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if (!token || !decodedToken.id) {
          return res.status(401).json({
            error: 'Invalid or missing token.',
          });
        }
      } catch (err) {
        return next(err);
      }
      
    const comment = new Comment({
        text: req.body.text
    })

    try {
        const result = await comment.save()
        return res.status(201).json(result)
    }catch (err){
        return next(err)
    }
})

module.exports = commentsRouter