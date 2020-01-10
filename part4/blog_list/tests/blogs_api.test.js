const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const values = require('./test_values')
const Blog = require('../models/blog')
const id_format = require('../utils/id_format')

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

        expect(results.body).toEqual(id_format(values.listWithManyBlogs))
    })

    test('Adding a new blog works', async () => {
        await api.post('/api/blogs/')
        .send(values.postBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const results = await api.get('/api/blogs/')
        expect(results.body.length).toBe(values.listWithManyBlogs.length + 1)

        const resultsNotId = results.body.map(n => {
            const idLess = {... n}
            delete idLess.id
            return idLess
        })

        expect(resultsNotId).toContainEqual(values.postBlog)

    })

    test('Adding a malformated blog returns error', async () => {
        await api.post('/api/blogs/')
        .send(values.badPostBlog)
        .expect(400)

        const results = await api.get('/api/blogs/')
        expect(results.body.length).toBe(values.listWithManyBlogs.length)
    })

    test('Unique id is named id', async () => {
        const results = await api.get('/api/blogs/')
        results.body.map(res => {
            expect(res.id).toBeDefined()
        })
    })

    test('Post request with no likes defaults zero', async () => {
        await api.post('/api/blogs/')
        .send(values.postNoLikes)
        .expect(201)

        const results = await api.get('/api/blogs/')
        expect(results.body[results.body.length-1].likes).toBe(0)
    })

    test('Delete request works', async () => {
        await api.delete('/api/blogs/'+values.testID)
        .expect(204)

        await api.get('/api/blogs/'+values.testID)
        .expect(404)
    })

    test('Put request works', async () => {
        await api.put('/api/blogs/'+values.testID).send({likes: 99999})
        .expect(200)

        const doubleCheck = await api.get('/api/blogs/'+values.testID)
        expect(doubleCheck.body.likes).toBe(99999)
        
    })
})

afterAll(() => mongoose.connection.close())