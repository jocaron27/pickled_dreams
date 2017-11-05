import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import { getSearch } from "../store/products";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    this.props.handleInputValue(event.target.children[0].value);
  }

  render() {
    const { products, inputValue } = this.props;
    const filteredProds = products.filter(product => {
      return product.title.toLowerCase().match(inputValue) ||
        product.title.toUpperCase().match(inputValue) ||
        inputValue === ""
        ? true
        : false;
    });
    return (
      <div className="main">
        <form
          className="form-group"
          style={{ marginTop: "20px" }}
          onSubmit={this.handleInputChange}
        >
          <input
            className="list-group"
            placeholder="search product"
            type="text"
            name="product-search"
          />
          <button type="submit">Search</button>
        </form>
        <div>
          <h1>Welcome!</h1>
        </div>
        <div className="product-list" key={products.id}>
          {filteredProds.map(product => {
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
                  <button className="btn btn-default">Add To Cart</button>
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
    products: state.products.allProducts,
    inputValue: state.products.inputValue
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleInputValue(searchParam) {
      dispatch(getSearch(searchParam));
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
