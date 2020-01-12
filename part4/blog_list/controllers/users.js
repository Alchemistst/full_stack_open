const userRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.post('/', async (req, res, next) => {
    
    const { body } = req

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