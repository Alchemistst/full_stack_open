const express = require('express')
const Note = require('../models/note')

//Router init
const router = express.Router()

//Route handlers
router.get('/', async (req, res, next) => {
    try{
        const result = await Note.find({})
        return res.status(200).send(result)
    }catch(err){
        return next(err)
    }
})

router.post('/', async (req, res, next) =>{
    try{
        const newNote = new Note({...req.body})
        newNote.date = Date.now()
        await newNote.save()
        return res.status(201).send(`You added: ${newNote.note}`)
    }catch(err){
        next(err)
    }
})

module.exports = router