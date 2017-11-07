import axios from "axios";

//initial state

const initialState = {};

//ACTIONS

const GET_CURRENT_ORDER = "GET_CURRENT_ORDER";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

//ACTION CREATORS

export function getOrder(order) {
  return { type: GET_CURRENT_ORDER, order };
}

//THUNK

export function fetchOrder() {
  return function thunk(dispatch) {
    return axios
      .get("/api/orders/cart")
      .then(res => {
        dispatch(getOrder(res.data));
      })
      .catch(console.err);
  };
}

export function addCart(productId, orderId, quantity) {
  return function(dispatch) {
    return axios
      .put("/api/orders/addToCart", { productId, orderId, quantity })
      .then(() => dispatch(fetchOrder()))
      .then(addedItem => {
        alert("Item added to cart!");
      })
      .catch(console.error);
  };
}

export function removeFromCart(productId, orderId) {
  return function(dispatch) {
    return axios
      .delete(`/api/orders/${orderId}/product/${productId}`)
      .then(res => {
        dispatch(fetchOrder());
      })
      .catch(console.error);
  };
}

//Reducer

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_ORDER:
      return action.order;
    default:
      return state;
  }
};

export default reducer;
