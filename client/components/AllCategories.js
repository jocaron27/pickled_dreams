import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createCategory, deleteCategory, writeCategoryName, fetchCategories } from '../store/categories';

class AllCategories extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      newCategoryName: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleClick() {
    this.setState({ isClicked: true })
  }
  handleAddition(event) {
    console.log(event.target.value)
    this.setState({ newCategoryName: event.target.value })
  }
  render() {
    const { categories, handleAdd, handleDelete } = this.props;
    return (<div>

      {this.state.isClicked ?
        <div id="add-category-form">
          <form onSubmit={(event) => handleAdd(event, this.state.newCategoryName)} >
            <input type="text" name="name" onChange={this.handleAddition} />
            <button type="submit">Add</button>
          </form>
        </div>
        : <button onClick={this.handleClick}>Add A Category</button>
      }
      <div id="category-table">
        <table>
          <thead>
            <tr>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              categories && categories.map((category) => {
                return (
                  <tr key={category.id} >
                    <td>{category.name}</td>
                    <td id="delete-category-button">
                      <button value={category.id} onClick={() => handleDelete(category.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>)
  }
}


function mapStateToProps(state) {
  return {
    categories: state.category.categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleDelete(id) {
      let confirmation = confirm('Are you sure you want to delete this category?');
      if (confirmation) {
        dispatch(deleteCategory(id))
        dispatch(fetchCategories())
      }
    },
    handleAdd(event, name) {
      event.preventDefault()
      dispatch(createCategory(name))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
