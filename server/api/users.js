const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router


// ('api/users...')

// HOW DO WE ALLOW ONLY ADMINS TO ACCESS THIS ROUTE?????

router.get('/', (req, res, next) => {
  if(req.user && req.user.isAdmin){
    User.findAll({
      // explicitly select only the id and email fields 
      attributes: ['id', 'email']
    })
      .then(users => res.json(users))
      .catch(next)
  } else {
    res.sendStatus(401)
  }
})

router.get('/:id',(req,res,next) => {

    User.findOne({
      where: {
        id: req.params.id
      }, 
        attributes: ['id', 'email'] 
    })
      .then(user => {
        if(req.user && (req.user.isAdmin || req.user.id === user.id)){
          res.json(user)
          .catch(next)
        }else{
          res.sendStatus(401)
        }
      })
      
})

router.put('/:id', (req,res,next) => {
  
  User.findById(req.params.id)
    .then(user => {
      if(req.user && req.user.isAdmin){
        user.update({
          isAdmin: req.body.isAdmin
        })
        .then(user => res.json(user))
        .catch(next)

      } else if(req.user && req.user.id === user.id){
        user.update({
          password: req.body.password
        })
        .then(user => res.json(user))
        .catch(next)
      } else {
        res.sendStatus(401)
      }
    })
})

router.delete('/:id', (req,res,next)=>{
  if(req.user && req.user.isAdmin){
    User.findById(req.params.id)
      .then(user => user.destroy())
      .then(res.sendStatus(200))
      .catch(next)
  }
})

/*
router.delete('/:id', (req,res,next)=>{

  *** req.user is signed-in authhenticated user
  if(req.user && (req.user.id === req.params.id || req.user.isAdmin))
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(res.sendStatus(200))
    .catch(next)
})
*/