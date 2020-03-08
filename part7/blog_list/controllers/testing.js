const testingRouter = require('express').Router()
const Blog = require('../models/blog')

testingRouter.post('/reset', async (req, res)=>{
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = testingRouter
