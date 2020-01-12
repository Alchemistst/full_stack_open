const User = require('../models/user')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const id_format = require('../utils/id_format')

const api = supertest(app)

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

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of usertest) {

        let newUser = new User(user)
        await newUser.save()
    }
})

describe('Database', () => {
    test('...is correctly initialized', async () => {
        const users = await User.find({})
        expect(users.map(user => user.toJSON())).toEqual(id_format(usertest))
    })
    // test('...can be created', async () => {
    //     const newUser = {
    //         name: 'Perry',
    //         username: 'hissingbastard78',
    //         pass:'hissingbastard78'
    //     }

    //     const result = await api.post('/api/users/')
    //         .send(newUser)
    //         .expect(201)

    //     delete newUser.pass

    //     expect(result.body).toMatchObject(newUser)
    // })
})
// describe('User', () => {
//     test('...can be created', async () => {
//         const newUser = {
//             name: 'Perry',
//             username: 'hissingbastard78',
//             pass:'hissingbastard78'
//         }

//         const result = await api.post('/api/users/').send(newUser)

//         delete newUser.pass

//         expect(result.body).toMatchObject(newUser)
//     })
// })

afterAll(() => mongoose.connection.close())