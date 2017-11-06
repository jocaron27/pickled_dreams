import axios from 'axios';

//initial state

const initialState = [];

//ACTIONS

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";


//ACTION CREATORS

export function getCart(cart = []) {
    return { type: GET_CART, cart }
}
export function add(item) {
    return { type: ADD_TO_CART, item }
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

//Reducer

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart || []
        case ADD_TO_CART:
            return [...state, action.item]
        default:
            return state
    }
}

export default reducer;
