const router = require('express').Router()
const db = require('../db/models');
const {OrderProduct, Order} = require('../db/models')
module.exports = router


// ('api/order_products...')

router.get('/', (req, res, next) => {

  if(req.user && req.user.isAdmin){
      OrderProduct.findAll()
        .then(orders => res.json(orders))
        .catch(next)

  } else if(req.user) {
      OrderProduct.findAll()       
        .then(orders => res.json(orders))
        .catch(next);
  } else {
      res.sendStatus(404);
  }  
})

router.get('/:id',(req,res,next) => {
  OrderProduct.findById(req.params.id)
    .then(order => {
        if(req.user && (req.user.isAdmin || req.user.id === order.userId)){
            res.json(order)
            .catch(next)
        }else{
            res.sendStatus(401)
        }
    })

})

router.post('/', (req,res,next)=> {
  OrderProduct.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

//ONLY ADMINS CAN EDIT ORDER_PRODUCTS
router.put('/:id', (req,res,next) => {
    if(req.user && req.user.isAdmin){
        OrderProduct.findById(req.params.id)
          .then(order => order.update({
            status: req.body.status
          }))
          .then(order => res.json(order))
          .catch(next)
    } else {
        res.sendStatus(401)
    }
})