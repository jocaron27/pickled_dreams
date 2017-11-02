const request = require('supertest')
, {expect} = require('chai')
, db = require('./server/db')
, app = require('./server/api')

const Product = db.model('product')

describe('/api/products', () => {
    before('Await database sync', () => db.didSync)
    afterEach('Clear tables', () => db.truncate({cascade: true}))

    let productOne, productTwo
    beforeEach('Seed products', () => {
        const products = [
            {
                title: 'debt free',
                description: 'NO MORE DEBT!!!',
                price: 2000,
                quantity_available: 3,
                photo: "https://debitize.com/blog/wp-content/uploads/2017/03/debt-free.jpg"
            },
            {
                title: 'Fathers approval',
                description: 'yes, you can!',
                price: 100,
                quantity_available: 1000000,
                photo: "http://www.crcconline.org/uploads/Sun_July3-4_MediaPlayer(1).jpg"
            }
        ]
        return Product.bulkCreate(products, {returning: true})
            .then(createdProducts => {
                productOne = createdProducts[0],
                productTwo = createdProducts[1]
            })
    })
    describe('GET', () => 
        it('retrieves all products', () => {
            request(app)
                .get('/products')
                .expect(200)
                .then(res => expect(res.body.length).to.equal(2))
                .catch(console.err)
        })
    )
})