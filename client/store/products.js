import axios from "axios";

//initial state

const initialState = {
  allProducts: [],
  inputValue: ""
};

//ACTIONS

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_SEARCH = "GET_SEARCH";

//ACTION CREATORS

export function getProducts(products) {
  return { type: GET_PRODUCTS, products };
}
export function getSearch(inputValue) {
  return { type: GET_SEARCH, inputValue };
}

//THUNK

export function fetchProducts() {
  return function thunk(dispatch) {
    return axios
      .get("/api/products")
      .then(res => dispatch(getProducts(res.data)))
      .catch(console.err);
  };
}

//Reducer

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return Object.assign({}, state, {
        allProducts: action.products
      });
    case GET_SEARCH:
      return Object.assign({}, state, { inputValue: action.inputValue });
    default:
      return state;
  }
};

export default reducer;
