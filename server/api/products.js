const router = require("express").Router();
const { Product, Category } = require("../db/models");
module.exports = router;

// ('api/products...')
router.get("/", (req, res, next) => {
    Product.findAll({ include: [{ model: Category , attributes: ['name'] }] })
        .then(products => res.json(products))
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id, {
        include: [{ model: Category }]
    })
        .then(product => res.json(product))
        .catch(next);
});

// ONLY ADMIN CAN POST/EDIT/DELETE BELOW

router.post("/", (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Product.create(req.body)
            .then(product => res.json(product))
            .catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.put("/:id", (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Product.findById(req.params.id)
            .then(product => product.update(req.body))
            .then(product => res.json(product))
            .catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.delete("/:id", (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        Product.findById(req.params.id)
            .then(product => product.destroy())
            .then(res.sendStatus(200))
            .catch(next);
    } else {
        res.sendStatus(401);
    }
});
