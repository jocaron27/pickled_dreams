const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router


// ('api/reviews...')


router.post('/', (req,res,next)=> {
    if(req.user){
        Review.create(req.body)
          .then(review => res.json(review))
          .catch(next)
    } else {
        res.sendStatus(401)
    }  
})

router.put('/:id', (req,res,next) => {
    Review.findById(req.params.id)
        .then(review => {
            if(req.user && review.userId === req.user.id){
                review.update(req.body)
                    .then(review => res.json(review))
                    .catch(next)
            } else {
                res.sendStatus(401)
            }
    })
})

router.delete('/:id', (req,res,next)=>{
    Review.findById(req.params.id)
        .then(review => {
            if(req.user && (review.userId === req.user.id)){
                review.destroy()
                    .then(res.sendStatus(200))
                    .catch(next)
            } else {
                res.sendStatus(401)
            }
    })
})