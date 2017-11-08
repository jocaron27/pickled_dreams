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
  ShippingOrderForm,
  ConfirmationPage,
  AllCategories,
  UserOrders
} from "./components";

import { me } from "./store";
import { fetchProducts } from "./store/products";
import { fetchReviews } from "./store/reviews";
import { fetchOrders } from "./store/orders";
import { fetchOrder } from "./store/cart";
import { fetchCategories } from "./store/categories";
import { fetchUserOrders } from "./store/orders";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.me();
    this.props.fetchProducts();
    this.props.fetchCategories();
    this.props.fetchOrders();
    this.props.fetchOrder();
    this.props.fetchReviews();
  }

  // componentWillReceiveProps() {
  //   this.props.fetchOrder();
  // }

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
            <Route exact path="/checkout" component={ShippingOrderForm} />
            <Route
              exact
              path="/confirmation-page"
              component={ConfirmationPage}
            />

            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
                <Route exact path="/categories" component={AllCategories} />
                <Route path="/orders" component={UserOrders} />
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
    cart: state.cart,
    reviews: state.allReviews,
    categories: state.categories
  };
};

const mapDispatch = {
  me,
  fetchProducts,
  fetchCategories,
  fetchOrders,
  fetchOrder,
  fetchReviews
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
