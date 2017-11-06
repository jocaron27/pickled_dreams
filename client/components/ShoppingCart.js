import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function ShoppingCart(props) {

  // let userOrder = orders.find(order => order.status === 'cart');

  // let userOrderId = userOrder ? userOrder.id : null;

  // const actualOrder = orderProducts.filter(order => order.orderId === userOrderId);

  let subtotal = 0;
  console.log(props)
  return (
    <div>
      <h1>Shopping Cart</h1>

      <div id="shoppingcart-all-items">
        <h3>All Items In Cart:</h3>
        <ul>
          {props.order.products && props.order.products.map((product, index) => {
            subtotal += (product.order_product.quantity * product.price)
            return (
              <li key={product.id} className="shoppingcart-single-item">
                <Link to={`/products/${product.id}`}>
                  <img className="media-object" src={product.photo} width="50px" />
                </Link>
                <h3>{product.title}</h3>
                <p>Qty: {product.order_product.quantity}  Price: $ {product.price}</p>
                <hr />
              </li>
            )
          })
          }
        </ul>
      </div>

      <div>
        <h3>Subtotal: $ {subtotal}</h3>
        <Link to={'/checkout'}>
          <button>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    order: state.orders
  }
}

export default connect(mapStateToProps)(ShoppingCart)

