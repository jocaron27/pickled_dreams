import axios from 'axios';

//initial state

const initialState = [];

//ACTIONS

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const UPDATE_QUANTITY = "UPDATE_QUANTITY";


//ACTION CREATORS

export function getCart(cart = []) {
    return { type: GET_CART, cart }
}
export function add(item) {
    return { type: ADD_TO_CART, item }
}
export function remove() {
    return { type: REMOVE_FROM_CART }
}
export function update(changedItem) {
    return { type: UPDATE_QUANTITY, changedItem }
}

//THUNK 

export function fetchCart() {
    return function thunk(dispatch) {
        return axios.get('/api/orders')
            .then(res => {
                res ? dispatch(getCart(res.data)) : console.log(res)
            })
            .catch(console.error)
    }
}
export function addCart(productId, orderId, quantity) {
    return function (dispatch) {
        return axios.put('/api/orders/addToCart', { productId, orderId, quantity })
            .then(res => dispatch(add(res.data)))
            .catch(console.error)
    }
}
export function removeFromCart(productId, orderId) {
    return function (dispatch) {
        return axios.delete(`/api/orders/${orderId}/product/${productId}`)
            .then(dispatch(remove()))
            .catch(console.error)
    }
}
export function updateItemQuantity(productId, orderId, quantity) {
    return function (dispatch) {
        return axios.put('/api/orders/updateCart', { productId, orderId, quantity })
            .then(res => dispatch(update(res.data)))
            .catch(console.error)
    }
}

//Reducer

const reducer = function (state = initialState, action) {///THIS NEEDS FIXING FOR HOT RELOADING
    switch (action.type) {
        case GET_CART:
            return action.cart || []
        case ADD_TO_CART:
            return [...state, action.item]
        case REMOVE_FROM_CART:
            return state
        case UPDATE_QUANTITY:
            return state;
        default:
            return state
    }
}

export default reducer;
