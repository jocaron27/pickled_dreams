import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import SingleProduct from './components/SingleProduct'
import AllProducts from './components/allProducts'
import fetchProducts from './store/products'

// establishes socket connection
import './socket'

store.dispatch(fetchProducts)

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
