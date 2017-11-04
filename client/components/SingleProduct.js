import React from "react";
import { connect } from "react-redux";
import WriteReview from "./reviewForm";
import { Link } from "react-router";

function SingleProduct(props) {
  const { products, productId } = props;
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

  let actualQuantity = product.quantityAvailable;
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
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <div className="single-product">
        <img src={product.photo} width="400px" />
        <div className="-single-product-title">{product.title}</div>
        <div className="single-product-description">{product.description}</div>
        <div className="single-product-price">${product.price}</div>
        {product.quantityAvailable ? (
          <select>{options.map(option => option)}</select>
        ) : (
          <div>"Sorry, this item is out of stock"</div>
        )}
        <WriteReview productId={props.productId} />
      </div>
    </div>
  );
}

// {(product.quantityAvailable) ? (
//     <form>
//     {select}
//     <input type="submit" className="add-cart-button" value="Add to Cart" />
//     </form>) : <div className="single-product-none">Sorry, this product is out of stock.</div>}

const mapStateToProps = function(state, ownProps) {
  const productId = Number(ownProps.match.params.id);
  return {
    products: state.products || [],
    productId: productId
  };
};

//need submit handler

const LoadProduct = connect(mapStateToProps)(SingleProduct);

export default LoadProduct;
