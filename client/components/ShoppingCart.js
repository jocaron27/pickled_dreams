import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, updateItemQuantity } from '../store/order_products';


function ShoppingCart(props) {
  let subtotal = 0;

  function quantityOptions(currentQuantity) {
    let options = []
    for (let i = 0; i < currentQuantity + 5; i++) {
      options.push(
        <option value={i + 1} key={i + 1}>
          {i + 1}
        </option>
      );
    }
    return options
  }

  return (
    <div>
      <h1>Shopping Cart</h1>

      <div id="shoppingcart-all-items">
        <h3>All Items In Cart:</h3>
        <ul>
          {props.order.products && props.order.products.map((product) => {
            subtotal += (product.order_product.quantity * product.price)
            return (
              <li key={product.id} className="shoppingcart-single-item">
                <Link to={`/products/${product.id}`}>
                  <img className="media-object" src={product.photo} width="50px" />
                </Link>
                <h3>{product.title}</h3>
                <p>Qty: {product.order_product.quantity}  Price: $ {product.price}</p>
                <select onChange={(event) => props.handleUpdate(product.id, props.order.id, event.target.value)} defaultValue={product.order_product.quantity}>
                  {
                    quantityOptions(product.order_product.quantity)
                  }
                </select>
                <hr />
                <button onClick={() => props.handleRemove(product.id, props.order.id)}>Remove From Cart</button>
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
function mapDispatchToProps(dispatch) {
  return {
    handleRemove(productId, orderId) {
      dispatch(removeFromCart(productId, orderId))
    },
    handleUpdate(productId, orderId, quantity) {
      dispatch(updateItemQuantity(productId, orderId, quantity))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

