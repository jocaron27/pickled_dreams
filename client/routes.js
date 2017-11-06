import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "react-router";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import history from "./history";

import {
  Main,
  Login,
  Signup,
  UserHome,
  AllProducts,
  ShoppingCart,
  SingleProduct,
  ShippingOrderForm
} from "./components";

import { me } from "./store";
import { fetchProducts } from "./store/products";
import { fetchReviews } from "./store/reviews";
import { fetchOrders } from "./store/orders";
import { fetchOrderProduct } from "./store/order_products"
import { fetchCategories } from "./store/categories"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadProducts()
    this.props.loadOrders()
    this.props.loadOrderProducts()
    this.props.loadReviews();
    this.props.loadCategories();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={AllProducts} />
            <Route exact path="/home" component={AllProducts} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/shopping-cart" component={ShoppingCart} />
            <Route exact path="/ordering" component={ShippingOrderForm} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
              </Switch>
            )}
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    products: state.products,
    orders: state.orders,
    order_products: state.orderProducts,
    reviews: state.allReviews,
    categories: state.categories
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadProducts() {
      dispatch(fetchProducts());
    },
    loadCategories() {
      dispatch(fetchCategories());
    },
    loadOrders() {
      dispatch(fetchOrders());
    },
    loadOrderProducts() {
      dispatch(fetchOrderProduct())
    },
    loadReviews() {
      dispatch(fetchReviews());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadOrders: PropTypes.func.isRequired,
  loadOrderProducts: PropTypes.func.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
