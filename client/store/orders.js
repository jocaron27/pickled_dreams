import axios from 'axios';

//initial state

const initialState = [];

//ACTIONS

const GET_ORDERS = "GET_ORDERS";


//ACTION CREATORS

export function getOrders(orders) {
    return {type: GET_ORDERS, orders}
}

//THUNK 

export function fetchOrders() {
    return function thunk(dispatch) {
        return axios.get('/api/orders')
            .then(res => dispatch(getOrders(res.data)))
            .catch(console.err)
    }
}

//Reducer

const reducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_ORDERS:
            return action.orders
        default:
            return state
    }
}

export default reducer;