/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Main } from './main';
export { default as UserHome } from './user-home';
export { default as AllProducts } from './allProducts';
export { default as ShoppingCart } from './ShoppingCart';
export { default as WriteReview } from './reviewForm';
export { default as SingleProduct } from './SingleProduct';
export { default as ShippingOrderForm } from './ShippingOrderForm';
export { default as ConfirmationPage} from './ConfirmationPage';

export { default as AllCategories } from './AllCategories';
export { default as UserOrders } from './UserOrders';

export { Login, Signup } from './auth-form';
