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
  SingleProduct
} from "./components";

<<<<<<< HEAD
import {me} from './store'
import { fetchProducts } from './store/products';
import { fetchOrders } from './store/orders';
import { fetchOrderProduct } from './store/order_products'
=======
import { me } from "./store";
import { fetchProducts } from "./store/products";
import { fetchReviews } from "./store/reviews";
>>>>>>> master

/**
 * COMPONENT
 */
class Routes extends Component {
<<<<<<< HEAD
  componentDidMount () {
    this.props.loadInitialData()
    this.props.loadProducts()
    this.props.loadOrders()
    this.props.loadOrderProducts()
=======
  componentDidMount() {
    this.props.loadInitialData();
    this.props.loadProducts();
    this.props.loadReviews();
>>>>>>> master
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
<<<<<<< HEAD
            <Route exact path="/products/:id" render={(props) => <SingleProduct {...props} />} />
            <Route exact path='/shopping-cart' component={ShoppingCart}/>

            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
=======
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/shopping-cart" component={ShoppingCart} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
              </Switch>
            )}
>>>>>>> master
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
<<<<<<< HEAD
    orders: state.orders,
    order_products: state.orderProducts
  }
}
=======
    reviews: state.allReviews
  };
};
>>>>>>> master

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    loadProducts() {
      dispatch(fetchProducts());
    },
<<<<<<< HEAD
    loadProducts () {
      dispatch(fetchProducts())
    },
    loadOrders () {
      dispatch(fetchOrders())
    },
    loadOrderProducts(){
      dispatch(fetchOrderProduct())
=======
    loadReviews() {
      dispatch(fetchReviews());
>>>>>>> master
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
<<<<<<< HEAD
  isLoggedIn: PropTypes.bool.isRequired,
  loadOrders: PropTypes.func.isRequired,
  loadOrderProducts: PropTypes.func.isRequired
}
=======
  loadReviews: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
>>>>>>> master
