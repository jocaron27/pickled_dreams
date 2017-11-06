import axios from 'axios';

//initial state

const initialState = [];

//ACTIONS

const GET_ORDERS = "GET_ORDERS";
const ADD_ITEM_TO_ORDER = "ADD_ITEM_TO_ORDER"


//ACTION CREATORS

export function getOrders(orders) {
    return {type: GET_ORDERS, orders}
}

export function addToOrder(item){
    return { type: ADD_ITEM_TO_ORDER, item}
}

//THUNK 

export function fetchOrders() {
    return function thunk(dispatch) {
        return axios.get('/api/orders')
            .then(res => dispatch(getOrders(res.data)))
            .catch(console.err)
    }
}

export function addToCart(product){
    return function thunk(dispatch) {
        return axios.post('/api/orders', product)
            .then(res => dispatch(addToOrder(res.data)))
            .catch(console.err)
    }
}


//Reducer

const reducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_ORDERS:
            return action.orders
        case ADD_ITEM_TO_ORDER:
            return action.item
        default:
            return state
    }
}

export default reducer;