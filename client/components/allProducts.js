import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import { addToCart } from "../store/orders"
import { connect } from "react-redux";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import SingleProduct from "./SingleProduct";

class AllProducts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { products } = this.props;
    return (
      <div className="main">
        <div>
          <h1>Welcome!</h1>
        </div>
        <div className="product-list" key={products.id}>
          {products.map(product => {
            return (
              <div className="product-container" key={product.id}>
                <div className="product-title">{product.title}</div>
                <Link to={`/products/${product.id}`} className="list-link">
                  <div className="product">
                    <img src={product.photo} width="200px" />
                  </div>
                </Link>
                <div className="item-price">
                  <span>${product.price}</span>
                  <button className="btn btn-default" onClick={()=> this.props.addToCart(product) }>Add To Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    // item: state.products.item
  };
}

export default connect(mapStateToProps, { addToCart })(AllProducts);
