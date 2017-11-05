/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach('Clear tables', () => db.truncate({cascade: true}))

  describe('Creating new product object', () => {
 
      let newItem

      beforeEach(() => {
        return Product.create({
          title: 'Automagic',
          description: 'When everything goes right, but you have no idea how',
          price: 9.99,
          quantityAvailable: 50,
          photo: '/.public/images/img_123'
        })
        .then(product => {
          newItem = product
        })
      })

      it('returns an object', () => {
          expect(newItem).to.be.an('object');
      })
      it('returns an object with title equal to "Automagic"', () => {
        expect(newItem.title).to.equal('Automagic')
      })


    
  }) // end describe('Creating new product object')
}) // end describe('Product model')
