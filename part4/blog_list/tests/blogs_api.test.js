const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const values = require('./test_values')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of values.listWithManyBlogs) {

        let newBlog = new Blog(blog)
        await newBlog.save()
    }
   
})

describe('API tests', () => {
    test('database is correctly initialized', async () =>{
        const results = await api.get('/api/blogs/')
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
        expect(results.body).toEqual(values.listWithManyBlogs)
    })
})

afterAll(() => mongoose.connection.close() )