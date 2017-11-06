const router = require('express').Router()
const { Order, Product, OrderProduct } = require('../db/models')
const chalk = require('chalk')
module.exports = router


// ('api/orders...')

router.get('/', (req, res, next) => {

    if (req.user && req.user.isAdmin) {
        Order.findAll()
            .then(orders => res.json(orders))
            .catch(next)

    } else if (req.user) {
        Order.findOne({
            where: {
                userId: req.user.id,
                status: 'cart'
            },
            include: [{ model: Product }]
        })
            .then(order => res.json(order))
            .catch(next)
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
        .then(Order.create({ userId: userId }))
        .then(order => res.json(order))
        .catch(next)

})

///ADD TO CART
router.put('/addToCart', (req, res, next) => {
    chalk.green(req.body)
    OrderProduct.findOrCreate({
        where: {
            orderId: req.body.orderId,
            productId: req.body.productId
        }
    })
        .spread((order, isCreated) => {
            if (isCreated) {
                chalk.blue('THIS IS THE ORDER', order)
                return order.update({
                    quantity: req.body.quantity
                })
            } else {
                return order.update({
                    quantity: order.quantity + req.body.quantity
                })
            }
        })
        .then(order => res.json(order))
        .catch(next);
})



router.post('/', (req, res, next) => {///this is when someone makes 
    Order.create({ userId: req.user.id })
        .then(order => res.json(order))
        .catch(next)
})
// router.post('/', (req,res,next)=> {
//   console.log('req.body', req.body)  
// //   console.log('req.user',req.user.id)
//   Order.create(req.body)
//     .then(order => {
//         if (!order) {
//             console.log('order')
//             res.json(order)
//         } else {
//             // console.log('ORDER EXISTS')
//             res.status(400).send('ORDER EXISTS')
//         }
//         // res.json(order)

//     })
//     .catch(next)



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