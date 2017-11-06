
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart } from "../store/orders"
import { getCategory } from '../store/categories'
import { getSearch } from "../store/products";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.productCategoryFilter = this.productCategoryFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.handleCategory(evt.target.value)
  }

  productCategoryFilter(product, selectedCategory) {
    for (let category of product.categories) {
      if (category.name.match(selectedCategory)) {
        return true
      }
    }
    return false;
  }
  render() {
    const { products, inputValue, handleInputChange, categories, selectedCategory, addToCart } = this.props;
    const filteredByCategory = products.filter(product => this.productCategoryFilter(product, selectedCategory))
    const filteredProdsByName = filteredByCategory.filter(product => {
      return product.title.toLowerCase().match(inputValue.toLowerCase()) ||
        product.title.toUpperCase().match(inputValue.toUpperCase()) ||
        inputValue === ""
        ? true
        : false;
    });
    return (
      <div className="main">
        <form
          className="form-group"
          style={{ marginTop: "20px" }}
          onSubmit={handleInputChange}
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
        <div className="category-options">
          <select onChange={this.handleChange}>
            <option value="">Filter By Category</option>
            {
              categories && categories.map(category => {
                return <option value={category.name} key={category.id}>{category.name}</option>
              })

            }
          </select>
        </div>
        <div className="product-list" key={products.id}>

          {selectedCategory ? filteredProdsByName.map(product => {
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
                  <button className="btn btn-default" onClick={() => addToCart(product)} value={product.id}>Add To Cart</button>
                </div>
              </div>
            )
          })
            :
            products.map(product => {
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
                    <button className="btn btn-default" onClick={() => addToCart(product)} value={product.id}>Add To Cart</button>
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
    inputValue: state.products.inputValue,
    categories: state.category.categories,
    selectedCategory: state.category.selectedCategory
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleInputChange(event) {
      event.preventDefault();
      const searchParam = event.target.children[0].value;
      dispatch(getSearch(searchParam));
    },
    handleCategory(category) {
      dispatch(getCategory(category))
    },
    handleAddToCart(event) {
      dispatch(addToCart(event.target.value))
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
