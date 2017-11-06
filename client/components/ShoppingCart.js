import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ShoppingCart({ orders, orderProducts, products }) {

  let order = orders.find(order => order.status === 'cart');

  let orderId;

  order ? orderId = order.id : orderId = null;

  const actualOrder = orderProducts.filter(order => order.orderId === orderId);

  let subtotal = 0;


  return (
    <div>
      <h1>Shopping Cart</h1>

      <div id="shoppingcart-all-items">
        <h3>All Items In Cart:</h3>
        <ul>
          {actualOrder.map((item, index) => {
            let product = products.filter(product => product.id === item.productId)[0]
            let itemSubtotal = item.quantity * product.price;
            subtotal += itemSubtotal;

            return (
              <li key={index} className="shoppingcart-single-item">
                <Link to={`/products/${item.productId}`}>
                  <img className="media-object" src={product.photo} width="50px" />
                </Link>
                <h3>{product.title}</h3>
                <p>Qty: {item.quantity}  Price: $ {product.price}</p>
                <hr />
              </li>
            )
          })
          }
        </ul>
      </div>

      <div>
        <h3>Subtotal: $ {subtotal}</h3>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    orderProducts: state.orderProducts,
    products: state.products.allProducts
  }
}

export default connect(mapStateToProps)(ShoppingCart)

