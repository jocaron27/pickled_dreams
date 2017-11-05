import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategory } from '../store/categories'

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
    const { products, categories, selectedCategory } = this.props;
    const filteredByCategory = products.filter(product => this.productCategoryFilter(product, selectedCategory))
    return (
      <div className="main">
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
          {selectedCategory ? filteredByCategory.map(product => {
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
    products: state.products,
    categories: state.category.categories,
    selectedCategory: state.category.selectedCategory
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCategory(category) {
      dispatch(getCategory(category))
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
