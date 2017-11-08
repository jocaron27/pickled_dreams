import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeFromCart, addCart, fetchOrder, updateItemQuantity } from "../store/cart";

function ShoppingCart(props) {
  // let userOrder = orders.find(order => order.status === 'cart');

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
          {props.cart.products &&
            props.cart.products.map(product => {
              subtotal += product.order_product.quantity * product.price;
              return (
                <li key={product.id} className="shoppingcart-single-item">
                  <Link to={`/products/${product.id}`}>
                    <img
                      className="media-object"
                      src={product.photo}
                      width="50px"
                    />
                  </Link>
                  <h3>{product.title}</h3>
                  <p>
                    Qty: {product.order_product.quantity} Price: ${" "}
                    {product.price}
                  </p>
                  <select onChange={(event) => props.handleUpdate(product.id, props.cart.id, event.target.value)} defaultValue={product.order_product.quantity}>
                    {
                      quantityOptions(product.order_product.quantity)
                    }
                  </select>
                  <button
                    onClick={() =>
                      props.handleRemove(product.id, props.cart.id)}
                  >
                    Remove From Cart
                  </button>
                  <hr />
                </li>
              );
            })}
        </ul>
      </div>

      <div>
        <h3>Subtotal: $ {subtotal}</h3>
        <Link to={"/checkout"}>
          <button type="button" disabled={!subtotal}>
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleRemove(productId, orderId) {
      dispatch(removeFromCart(productId, orderId))
      alert("Item removed!");
      dispatch(removeFromCart(productId, orderId));
      dispatch(fetchOrder());
    },
    handleUpdate(productId, orderId, quantity) {
      dispatch(updateItemQuantity(productId, orderId, quantity))
      dispatch(fetchOrder())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
