import axios from 'axios';

//initial state

const initialState = [];

//ACTIONS

const GET_ORDER_PRODUCT = "GET_ORDER_PRODUCT";


//ACTION CREATORS

export function getOrderProduct(order_products) {
    return { type: GET_ORDER_PRODUCT, order_products }
}

//THUNK 

export function fetchOrderProduct() {
    return function thunk(dispatch) {
        return axios.get('/api/order_products/cart')
            .then(res => dispatch(getOrderProduct(res.data)))
            .catch(console.err)
    }
}

//Reducer

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_PRODUCT:
            return action.order_products
        default:
            return state
    }
}

export default reducer;