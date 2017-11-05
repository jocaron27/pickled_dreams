import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
<<<<<<< HEAD
import orders from './orders'
import orderProducts from './order_products'

const reducer = combineReducers({user, products, orders, orderProducts})
=======
import reviews from './reviews'

const reducer = combineReducers({user, products, reviews})
>>>>>>> master
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
<<<<<<< HEAD
export * from './orders'
export * from './order_products'
=======
export * from './reviews'
>>>>>>> master
