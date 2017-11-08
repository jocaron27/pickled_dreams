import axios from 'axios';

//initial state
const initialState = {

}

//ACTIONS

const GET_ORDERS = "GET_ORDERS";
const ADD_ITEM_TO_ORDER = "ADD_ITEM_TO_ORDER"
const GET_USERS_ORDERS = "GET_USERS_ORDERS"


//ACTION CREATORS

export function getOrders(orders) {
    return { type: GET_ORDERS, orders }
}

export function addToOrder(item) {
    return { type: ADD_ITEM_TO_ORDER, item }
}
export function getUsersOrders(userOrders) {
    return { type: GET_USERS_ORDERS, userOrders }
}

//THUNK 

export function fetchOrders() {
    return function thunk(dispatch) {
        return axios.get('/api/orders')
            .then(res => dispatch(getOrders(res.data)))
            .catch(console.error)
    }
}

export function fetchUsersOrders(id) {///can be refactored to only use req.user.id since the id of the user is persisted across the session
    return function thunk(dispatch) {
        return axios.get(`/api/orders/orderhistory/${id}`)
            .then(res => dispatch(getUsersOrders(res.data)))
            .catch(console.error)
    }
}

export function addToCart(product) {
    return function thunk(dispatch) {
        return axios.post('/api/orders', product)
            .then(res => dispatch(addToOrder(res.data)))
            .catch(console.error)
    }
}

//Reducer

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders
        case ADD_ITEM_TO_ORDER:
            return action.item
        case GET_USERS_ORDERS:
            return action.userOrders
        default:
            return state
    }
}

export default reducer;