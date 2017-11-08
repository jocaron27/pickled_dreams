import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { logout } from "../store";
import { getSearch } from "../store/products";
import { getCategory } from "../store/categories";

const Main = props => {
  const {
    children,
    handleClick,
    isLoggedIn,
    clearSearch,
    clearCategory
  } = props;

  return (
    <div>
      <nav>
        <div id="nav-main">
          <div id="nav-logo">
            <Link
              to="/"
              onClick={() => {
                clearSearch();
                clearCategory();
              }}
            >
              <h1>Pickled Dreams</h1>
            </Link>
          </div>
          <div id="nav-links">
            {isLoggedIn ? (
              <div className="nav-button">
                {/* The navbar will show these links after you log in */}
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
                <Link to="/orders">My Orders</Link>
              </div>
            ) : (
              <div className="nav-button">
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
            {isLoggedIn ? (
              <Link to="/shopping-cart">
                <span className="glyphicon glyphicon-shopping-cart" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
        <div id="nav-tagline">
          <h3>Existential abstractions for every occasion</h3>
          <p>Disclaimer: Jars may appear empty, but trust us, they’re full.</p>
        </div>
      </nav>
      <hr />
      {children}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    clearSearch() {
      dispatch(getSearch(""));
    },
    clearCategory() {
      dispatch(getCategory(""));
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
