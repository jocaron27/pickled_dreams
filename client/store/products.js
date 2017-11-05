import axios from "axios";

//initial state

const initialState = [];

//ACTIONS

const GET_PRODUCTS = "GET_PRODUCTS";

//ACTION CREATORS

export function getProducts(products) {
  return { type: GET_PRODUCTS, products };
}

//THUNK

export function fetchProducts() {
<<<<<<< HEAD
    return function thunk(dispatch) {
        return axios.get('/api/products')
            .then(res => dispatch(getProducts(res.data)))
            .catch(console.err)
    }
=======
  return function thunk(dispatch) {
    return axios
      .get("/api/products")
      .then(res => dispatch(getProducts(res.data)))
      .catch(console.err);
  };
>>>>>>> master
}

//Reducer

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default reducer;
