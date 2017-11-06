import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
const CREATE_CATEGORY = 'CREATE_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
const WRITE_CATEGORY_NAME = "WRITE_CATEGORY_NAME"
/**
 * INITIAL STATE
 */
const initialState = {
  categories: [],
  selectedCategory: '',
  newCategoryName: ''
};

/**
 * ACTION CREATORS
 */
export function writeCategoryName(name) {
  return { type: WRITE_CATEGORY_NAME, name }
}
export function getCategories(categories) {
  return { type: GET_CATEGORIES, categories }
}

export function getCategory(selectedCategory) {
  return { type: GET_CATEGORY, selectedCategory }
}
export function addCategory(category) {
  return { type: CREATE_CATEGORY, category }
}
export function removeCategory() {
  return { type: REMOVE_CATEGORY }
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
export function createCategory(category) {
  return function thunk(dispatch) {
    return axios.post('/api/categories', { category })
      .then(res => dispatch(addCategory(res.data)))
      .catch(console.error)
  }
}
export function deleteCategory(categoryId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/categories/${categoryId}`)
      .then(dispatch(removeCategory()))
      .catch(console.error)
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
    case CREATE_CATEGORY:
      return [...state.categories, action.category]
    case REMOVE_CATEGORY:
      return state.categories
    default:
      return state;
  }
}
export default reducer
