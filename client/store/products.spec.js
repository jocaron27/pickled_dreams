import {expect} from 'chai'
import {fetchProducts} from './products'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the GET PRODUCTS action', () => {
      const fakeProducts = [{
        title: 'Approval From Your Parents',
        description: 'Parents aren\'t always easy to please. As soon as you open this jar, you\'ll immediately experience the love and admiration from proud parents. Enjoy it while it lasts.',
        price: 99.99,
        quantityAvailable: 14,
        photo: '/raspberry.png'
      }, {
        title: 'Bear Hugs',
        description: 'You know, the warm, fuzzy kind of hug that you can just melt into?',
        price: 4.50,
        quantityAvailable: 25,
        photo: '/brown.png'
      }, {
        title: 'Your Fondest Memories',
        description: 'Kinda like the robot boy from the movie, AI, finally being able to fall asleep because the aliens dug into his memories so he could relive his fondest memory. You know the movie with Jude Law? By the way, have you seen the grown up version of that kid tho? Wow, what happened?',
        price: 3.99,
        quantityAvailable: 28,
        photo: '/citrus.png'
      }]
      console.log(fakeProducts);
      mockAxios.onGet('/api/products').replyOnce(200, fakeProducts)
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProducts)
        })
    })
  })
})
