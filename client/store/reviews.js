import axios from "axios";

//InitialState
const initialState = {
  allReviews: [],
  newReviewTitle: "",
  newReviewContent: "",
  newReviewRating: 0
};

//Action

const WRITE_REVIEW_TITLE = "WRITE_REVIEW_TITLE";
const WRITE_REVIEW_CONTENT = "WRITE_REVIEW_CONTENT";
const ADD_REVIEW = "ADD_REVIEW";
const GET_REVIEWS = "GET_REVIEWS";
const NEW_RATING = "NEW_RATING";

//Action Creators
export function writeReviewTitle(title) {
  return { type: WRITE_REVIEW_TITLE, title };
}
export function writeReviewContent(content) {
  return { type: WRITE_REVIEW_CONTENT, content };
}
export function writeReviewRating(rating) {
  return { type: NEW_RATING, rating };
}
export function addReview(review) {
  return { type: ADD_REVIEW, review };
}
export function getReviews(reviews) {
  return { type: GET_REVIEWS, reviews };
}

//Thunk
export function fetchReviews() {
  return function thunk(dispatch) {
    return axios
      .get('/api/reviews/')
      .then(res => res.data)
      .then(allReviews => dispatch(getReviews(allReviews)));
  };
}

export function createReview(review, id, history) {
  return function thunk(dispatch) {
    return axios
      .post(`/api/reviews/${id}`, review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(addReview(newReview));
        //history.push(`/reviews/${newReview.id}`);
      });
  };
}

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case WRITE_REVIEW_TITLE:
      return Object.assign({}, state, {
        newReviewTitle: action.title
      });
    case WRITE_REVIEW_CONTENT:
      return Object.assign({}, state, {
        newReviewContent: action.content
      });
    case NEW_RATING:
      return Object.assign({}, state, {
        newReviewRating: action.rating
      });
    case ADD_REVIEW:
      return Object.assign({}, state, {
        allReviews: [...state.allReviews, action.review]
      });
    case GET_REVIEWS:
      return Object.assign({}, state, {
        allReviews: action.reviews
      });
    default:
      return state;
  }
};

export default reducer;
