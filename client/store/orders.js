import axios from "axios";



const initialState = [];
//add users previous orders
//add users current order

//ACTIONS

const GET_ORDERS = "GET_ORDERS";
const ADD_ITEM_TO_ORDER = "ADD_ITEM_TO_ORDER";
const GET_USERS_PAST_ORDERS = "GET_USERS_PAST_ORDERS"

//ACTION CREATORS

export function getOrders(orders) {
    return { type: GET_ORDERS, orders }
}

export function addToOrder(item) {
    return { type: ADD_ITEM_TO_ORDER, item }
}
export function getUsersPastOrders(pastOrders) {
    return { type: GET_USERS_PAST_ORDERS, pastOrders }
}





//THUNK

export function fetchOrders() {
    return function thunk(dispatch) {
        return axios
            .get("/api/orders")
            .then(res => dispatch(getOrders(res.data)))
            .catch(console.err);
    };
}

export function addToCart(product) {
    return function thunk(dispatch) {
        return axios
            .post("/api/orders", product)
            .then(res => dispatch(addToOrder(res.data)))
            .catch(console.err);
    };
}

export function fetchUsersOrders() {
    return function thunk(dispatch) {
        return axios.get(`/api/orders/orderhistory`)
            .then(res => dispatch(getUsersPastOrders(res.data)))
            .catch(console.error)
    }
}

//Reducer

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS:
            return action.orders;
        case ADD_ITEM_TO_ORDER:
            return action.item;
        case GET_USERS_PAST_ORDERS:
            return action.pastOrders
        default:
            return state;
    }
};

export default reducer;
