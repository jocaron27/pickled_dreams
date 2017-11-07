import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { addCart } from "../store/cart";
import WriteReview from "./reviewForm";

function SingleProduct(props) {
  const {
    products,
    productId,
    reviews,
    handleAddCart,
    orderId,
    isLoggedIn,
    cart
  } = props;
  let product;
  products.length
    ? (product = products.find(singleProduct => singleProduct.id === productId))
    : (product = {
        photo: "",
        title: "",
        description: "",
        price: 0.0,
        quantityAvailable: 0
      });

  let chosenQuantity;
  const handleQuantity = function(evt) {
    evt.preventDefault();
    chosenQuantity = evt.target.value;
  };

  let actualQuantity = product.quantityAvailable;
  // console.log(cart);
  // console.log(cart.products);
  // let alreadyInCart = cart.products.find(
  //   cartProduct => cartProduct.id === product.id
  // );
  // if (alreadyInCart) actualQuantity -= alreadyInCart.quantity;

  let displayedQuantity;
  actualQuantity < 25
    ? (displayedQuantity = actualQuantity)
    : (displayedQuantity = 25);

  let selectDiv = document.createElement("div");
  let select = document.createElement("select");
  select.className = "single-product-select";
  selectDiv.appendChild(select);

  let options = [];

  for (let i = 1; i < displayedQuantity; i++) {
    if (i === 1) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    } else {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
  }

  return (
    <div>
      <div className="single-product">
        <img src={product.photo} width="400px" />
        <div className="-single-product-title">{product.title}</div>
        <div className="single-product-description">{product.description}</div>
        <div className="single-product-price">${product.price}</div>
        {product.quantityAvailable ? (
          <div className="single-product-add">
            <select onChange={handleQuantity} defaultValue={1}>
              {options.map(option => option)}
            </select>
            {isLoggedIn ? (
              <button
                onClick={() =>
                  handleAddCart(productId, orderId, chosenQuantity)}
              >
                Add to Cart
              </button>
            ) : (
              <span />
            )}
          </div>
        ) : (
          <div>"Sorry, this item is out of stock"</div>
        )}
        {isLoggedIn ? <WriteReview productId={props.productId} /> : <span />}
        <div>
          <h2>Reviews</h2>
        </div>
        {reviews
          .filter(review => review.productId === productId)
          .map(review => {
            return (
              <div key={review.id}>
                <div>{review.rating}</div>
                <div>{review.review_text}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = function(state, ownProps) {
  const productId = Number(ownProps.match.params.id);
  return {
    products: state.products.allProducts || [],
    productId: productId,
    reviews: state.reviews.allReviews,
    orderId: state.cart.id,
    isLoggedIn: !!state.user.id,
    cart: state.cart
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    handleAddCart(productId, orderId, quantity) {
      console.log(quantity);
      dispatch(addCart(productId, orderId, +quantity));
    }
  };
};

//need submit handler

const LoadProduct = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);

export default LoadProduct;
