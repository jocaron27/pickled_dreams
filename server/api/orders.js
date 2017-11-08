const router = require("express").Router();
const { Order, Product, OrderProduct } = require("../db/models");
module.exports = router;

// ('api/orders...')

router.get("/", (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Order.findAll()
            .then(orders => res.json(orders))
            .catch(next);
    } else if (req.user) {
        Order.findOne({
            where: {
                userId: req.user.id
            },
            include: [{ model: Product }]
        })
            .then(order => res.json(order))
            .catch(next);
    }
});

router.get("/cart", (req, res, next) => {
    if (req.user) {
        Order.findOne({
            where: {
                userId: req.user.id,
                status: "cart"
            },
            include: [{ model: Product }]
        })
            .then(order => {
                res.json(order);
            })
            .catch(next);
    }
});
router.get('/orderhistory', (req, res, next) => {
    Order.findAll({
        where: {
            userId: req.params.userId,
            status: {
                $ne: 'cart'
            }
        },
        include: [{ model: Product }]
    })
        .then(order => {
            if (req.user) {
                return res.json(order)
            } else {
                res.sendStatus(401)
            }
        })
        .catch(next);
})

router.get("/:id", (req, res, next) => {
    Order.findById(req.params.id).then(order => {
        if (req.user && (req.user.isAdmin || req.user.id === order.userId)) {
            res.json(order).catch(next);
        } else {
            res.sendStatus(401);
        }
    });
});


router.put("/submit", (req, res, next) => {
    const userId = req.user.id;
    Order.findOne({
        where: {
            userId: userId,
            status: "cart"
        }
    })
        .then(order =>
            order.update({
                status: "pending",
                date: new Date(),
                shippingAddress: req.body.shippingAddress,
                total: req.body.total
            })
        )
        .then(Order.create({ userId: userId }))
        .then(order => res.json(order))
        .catch(next);
});


///ADD TO CART
router.put("/addToCart", (req, res, next) => {
    OrderProduct.findOrCreate({
        where: {
            orderId: req.body.orderId,
            productId: req.body.productId
        }
    })
        .spread((order, isCreated) => {
            if (isCreated) {
                return order.update({
                    quantity: req.body.quantity
                });
            } else {
                return order.update({
                    quantity: order.quantity + req.body.quantity
                });
            }
        })
        .then(order => res.json(order))
        .catch(next);
});

router.put('/updateCart', (req, res, next) => {
    if (req.user) {
        OrderProduct.findOne({
            where: {
                orderId: req.body.orderId,
                productId: req.body.productId
            }
        })
            .then(order => order.update({ quantity: req.body.quantity }))
            .then(updatedOrder => res.json(updatedOrder))
            .catch(next)
    }
})
//Removing from cart 
router.delete("/:orderId/product/:productId", (req, res, next) => {
    OrderProduct.findOne({
        where: {
            orderId: req.params.orderId,
            productId: req.params.productId
        }
    })
        .then(cartItem => {
            return cartItem.destroy();
        })
        .then(() => res.json("done"))
        .catch(next);
});

//ONLY ADMINS CAN EDIT ORDER
router.put("/:id", (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Order.findById(req.params.id)
            .then(order =>
                order.update({
                    status: req.body.status
                })
            )
            .then(order => res.json(order))
            .catch(next);
    } else {
        res.sendStatus(401);
    }
});



// DO NOT NEED TO DELETE ORDERS
// router.delete('/:id', (req,res,next)=>{
//   Order.findById(req.params.id)
//     .then(order => order.destroy())
//     .then(res.sendStatus(200))
//     .catch(next)
// })
