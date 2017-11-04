import axios from 'axios';

//initial state

const initialState = []

//ACTIONS

const GET_PRODUCTS = "GET_PRODUCTS";

//ACTION CREATORS

export function getProducts(products) {
    return {type: GET_PRODUCTS, products}
}

//THUNK 

export function fetchProducts() {
    return function thunk(dispatch) {
        return axios.get('api/products')
            .then(res => res.data)
            .then(products => dispatch(getProducts(products)))
            .catch(console.err)
    }
}

//Reducer

const reducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS:
            return action.products
        default:
            return state
    }
}

export default reducer;