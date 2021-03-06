import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import products from "./products";
import orders from "./orders";
import reviews from "./reviews";
import orderForm from "./order-form";
import category from "./categories";
import cart from "./cart";
const reducer = combineReducers({
  user,
  products,
  orders,
  reviews,
  orderForm,
  category,
  cart
});

let middleware;
// if (process.env.NODE_ENV === "production") {
//   middleware = applyMiddleware(thunkMiddleware);
// } else {
middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
// }

const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./products";
export * from "./orders";
export * from "./reviews";
export * from "./order-form";
export * from "./categories";
export * from "./cart";
