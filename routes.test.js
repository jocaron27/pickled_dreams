const {expect} = require('chai')
const request = require('supertest')
const db = require('./server/db')
const app = require('./server/index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const title = 'debt free',
    description = 'NO MORE DEBT!!!',
    price = 2000,
    quantityAvailable = 3,
    photo = "https://debitize.com/blog/wp-content/uploads/2017/03/debt-free.jpg"

    beforeEach(() => {
      return Product.create({
        title, description, price, quantityAvailable, photo
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal(title)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
