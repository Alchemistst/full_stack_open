const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const values = require('./user_test_values')
const mongoose = require('mongoose')
const id_format = require('../utils/id_format')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of values.users){
        let newUser = new User(user)
        await newUser.save()
    }
})
describe('User', () => {
    
    test('...correctly initialized.', async () => {
        const res = await User.find({})
        expect(res.map(u => u.toJSON())).toEqual(id_format(values.users))
    })
})


afterAll(() => {mongoose.connection.close()})