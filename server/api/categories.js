const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router


// ('api/categories...')

router.get('/', (req, res, next) => {
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:id',(req,res,next) => {
    Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(next)
})


// ONLY ADMIN CAN POST/EDIT/DELETE BELOW

router.post('/', (req,res,next)=> {
    if(req.user && req.user.isAdmin){
        Category.create(req.body)
          .then(category => res.json(category))
          .catch(next)
    } else {
        res.sendStatus(401)
    }  
})

router.put('/:id', (req,res,next) => {
    if(req.user && req.user.isAdmin){
        Category.findById(req.params.id)
          .then(category => category.update(req.body))
          .then(category => res.json(category))
          .catch(next)
    } else {
        res.sendStatus(401)
    }
})

router.delete('/:id', (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        Category.findById(req.params.id)
            .then(category => category.destroy())
            .then(res.sendStatus(200))
            .catch(next)
    }else{
        res.sendStatus(401)
    }
})