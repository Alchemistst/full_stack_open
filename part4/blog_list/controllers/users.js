const userRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const _ = require('lodash')


userRouter.get('/', async (req,res) => {
    let result = await User.find({}).populate('blogs', { likes: 0, user: 0})

    result = result.map( r => {
        r = r.toJSON()
        delete r.passhash
        return r
    })
    
    res.status(200).json(result)
})

userRouter.post('/', async (req, res, next) => {
    
    const { body } = req

    if(!body.pass || !body.username){
        return res.status(400).json({
            error: 'Missing username or password.'
        })
    }

    if(body.pass.length < 3 || body.username.length < 3){
        return res.status(400).json({
            error: 'Username or password too short.'
        })
    }

    const user = new User({
        name: body.name,
        passhash: bcrypt.hashSync(body.pass, 10),
        username: body.username
    })

    try{
        const result = await user.save()
        res.status(201).json(result)
    }catch(err){
        next(err)
    }
})

module.exports = userRouter