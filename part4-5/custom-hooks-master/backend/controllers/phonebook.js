const express = require('express')
const router = express.Router()
const Phonebook = require('../models/number')

router.get('/', async (req, res, next) => {
    try{
        const result = await Phonebook.find({})
        return res.status(200).send(result)
    }catch(err){
        return next(err)
    }
})

router.post('/', async (req, res, next) =>{
    try{
        const newNumber = new Phonebook(req.body)
        await newNumber.save()
        return res.status(201).send(`You added  ${req.body.name}`)
    }catch(err){
        return next(err)
    }
})

module.exports = router