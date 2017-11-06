const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router


// ('api/orders...')

router.get('/', (req, res, next) => {

    if (req.user && req.user.isAdmin) {
        Order.findAll()
            .then(orders => res.json(orders))
            .catch(next)

    } else if (req.user) {
        Order.findAll({
            where: {
                userId: req.user.id
            }
        })
            .then(orders => res.json(orders))
            .catch(next);
    } else {
        res.sendStatus(404);
    }
})

router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id)
        .then(order => {
            if (req.user && (req.user.isAdmin || req.user.id === order.userId)) {
                res.json(order)
                    .catch(next)
            } else {
                res.sendStatus(401)
            }
        })

})
router.put('/submit', (req, res, next) => {
    const userId = req.user.id
    Order.findOne({
        where: {
            userId: userId,
            status: 'cart'
        }
    })
        .then(order => order.update({
            status: 'pending',
            date: new Date(),
            shippingAddress: req.body.shippingAddress
        }))
        .then(order => order.save())
        .then(Order.create({ userId: userId }))
        .then(order => res.json(order))
        .catch(next)

})
router.post('/', (req, res, next) => {///this is when someone makes 
    Order.create({ userId: req.user.id })
        .then(order => res.json(order))
        .catch(next)
})

//ONLY ADMINS CAN EDIT ORDER
router.put('/:id', (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Order.findById(req.params.id)
            .then(order => order.update({
                status: req.body.status
            }))
            .then(order => res.json(order))
            .catch(next)
    } else {
        res.sendStatus(401)
    }
})

// DO NOT NEED TO DELETE ORDERS
// router.delete('/:id', (req,res,next)=>{
//   Order.findById(req.params.id)
//     .then(order => order.destroy())
//     .then(res.sendStatus(200))
//     .catch(next)
// })