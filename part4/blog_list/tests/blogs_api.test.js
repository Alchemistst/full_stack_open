const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const values = require('./test_values')
const Blog = require('../models/blog')
const User = require('../models/user')
const id_format = require('../utils/id_format')
const _ = require('lodash')

const api = supertest(app)



describe('Blog API tests', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
    
        for (let blog of values.listWithManyBlogs) {
    
            let newBlog = new Blog(blog)
            await newBlog.save()
        }
    })

    test('All blogs can be requested', async () =>{
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

const usertest = [
    {
        _id: '5e1b64ad8c9ad54f142d5a78',
        name: 'Pady',
        passhash: '$2a$10$bumqPhD3NwPfybIVMx58k.Ii.3CMRoPbJD71t7ePqOYwoGfcVSKki',
        username: 'wishkerlicker39'
    },
    {
        _id: '5e1b64ad8c9ad54f142d5a79',
        name: 'Angus',
        passhash: '$2a$10$MiM.aTwBGjyd5fDeIKh8xeLawftMk4grEPDKJcYnXRz4.uinRC9pu',
        username: 'bloodthirstycat76'
    }
]

describe('Users API tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        for (let user of usertest) {
    
            let newUser = new User(user)
            await newUser.save()
        }
    })

    test('User database is correctly initialized', async () => {
        const users = await User.find({})
        expect(users.map(user => user.toJSON())).toEqual(id_format(usertest))
    })

    test('Users can be created', async () => {
        const newUser = {
            name: 'Perry',
            username: 'hissingbastard78',
            pass:'hissingbastard78'
        }

        const result = await api.post('/api/users/')
            .send(newUser)
            .expect(201)

        delete newUser.pass

        expect(result.body).toMatchObject(newUser)
    })

    test('Information of all users is displayed', async () => {
        const result = await api.get('/api/users/')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const correctFormat = _.cloneDeep(usertest)
            .map( u => {
                delete u.passhash
                return u
            })

        expect(result.body).toEqual(id_format(correctFormat))
    })

    test('Username must be given', async () => {
        const badUser = {
            name: 'badUser',
            username: '',
            pass: 'badUser'
        }
        
        const result = await api.post('/api/users/')
        .send(badUser)
        .expect(400)

        expect(result.body.error).toBe('Missing username or password.')
        
        const dbCheck = await User.find({ name: 'badUser'})
        expect(dbCheck).toEqual([])
    })

    test('Password must be given', async () => {
        const badUser = {
            name: 'badUser',
            username: 'badUser',
            pass: ''
        }
       
        const result = await api.post('/api/users/')
        .send(badUser)
        .expect(400)

        expect(result.body.error).toBe('Missing username or password.')

        const dbCheck = await User.find({ name: 'badUser'})
        expect(dbCheck).toEqual([])
    })

    test('Username must be unique', async () => {
        const duplicate = {
            name: 'duplicate',
            username: 'wishkerlicker39',
            pass: 'wishkerlicker39'
        }

        const result = await api.post('/api/users/')
        .send(duplicate)
        .expect(400)

        expect(result.body.error).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `wishkerlicker39`')

        const dbCheck = await User.find({ name: 'duplicate'})
        expect(dbCheck).toEqual([])
    })

    test('Password is at least 3 character long', async() => {
        const badUser = {
            name: 'badUser',
            username: 'badUser',
            pass: 'co'
        }

        const result = await api.post('/api/users/')
        .send(badUser)
        .expect(400)

        expect(result.body.error).toBe('Username or password too short.')

        const dbCheck = await User.find({ name: 'badUser'})
        expect(dbCheck).toEqual([])
    })

    test('Username is at least 3 character long', async() => {
        const badUser = {
            name: 'badUser',
            username: 'co',
            pass: 'badUser'
        }

        const result = await api.post('/api/users/')
        .send(badUser)
        .expect(400)

        expect(result.body.error).toBe('Username or password too short.')

        const dbCheck = await User.find({ name: 'badUser'})
        expect(dbCheck).toEqual([])
    })

})

afterAll(() => mongoose.connection.close())