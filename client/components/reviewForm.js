import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createReview,
  writeReviewTitle,
  writeReviewContent,
  writeReviewRating
} from "../store/reviews";

class WriteReview extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const ratingOptions = [];
    for (let i = 1; i < 6; i++) {
      ratingOptions.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    const {
      newReviewTitle,
      newReviewContent,
      handleSubmit,
      handleChangeContent,
      handleChangeTitle,
      handleChangeRating,
      newReviewRating
    } = this.props;
    const textareaStyle = { height: "150px", width: "350px", resize: "none" };
    return (
      <div className="main">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <h2>Add a Review</h2>
            </label>
            <input
              value={newReviewTitle}
              onChange={handleChangeTitle}
              className="form-control"
              type="text"
              name="title"
              placeholder="Enter a title"
            />
            <br />
            <textarea
              value={newReviewContent}
              onChange={handleChangeContent}
              className="form-control"
              type="text"
              name="content"
              placeholder="Enter your review"
              style={textareaStyle}
            />
            <select
              name="rating"
              value={newReviewRating}
              onChange={handleChangeRating}
            >
              <option>Pick a Rating</option>
              {ratingOptions.map(elem => elem)}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="button-main">
              Add Review
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    newReviewTitle: state.newReviewTitle,
    newReviewContent: state.newRevieContent,
    newReviewRating: state.newReviewRating
  };
};

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    handleChangeTitle(event) {
      console.log("this is title ", event.target.value);
      dispatch(writeReviewTitle(event.target.value));
    },
    handleChangeContent(event) {
      console.log("change content", event.target.value);
      dispatch(writeReviewContent(event.target.value));
    },
    handleChangeRating(event) {
      console.log("change rating", event.target.value);
      dispatch(writeReviewRating(event.target.value));
    },
    handleSubmit(event) {
      event.preventDefault();
      //const title = event.target.title.value;
      const content = event.target.content.value;
      const rating = Number(event.target.rating.value);

      dispatch(
        createReview({ content, rating }, ownProps.productId, ownProps.history)
      );
        dispatch(writeReviewTitle(""));
        dispatch(writeReviewContent(""));
        dispatch(writeReviewRating(0));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);
