import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
/**
 * INITIAL STATE
 */
const initialState = {
  categories: [],
  selectedCategory: ''
};

/**
 * ACTION CREATORS
 */
export function getCategories(categories) {
  return { type: GET_CATEGORIES, categories }
}

export function getCategory(selectedCategory) {
  return { type: GET_CATEGORY, selectedCategory }
}
/**
 * THUNK CREATORS
 */
export function fetchCategories() {
  return function thunk(dispatch) {
    return axios.get(`/api/categories`)
      .then(res => dispatch(getCategories(res.data)))
      .catch(err => console.log(err))
  }
}
/**
 * REDUCER
 */
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, { categories: action.categories });
    case GET_CATEGORY:
      return Object.assign({}, state, { selectedCategory: action.selectedCategory });
    default:
      return state;
  }
}
export default reducer
