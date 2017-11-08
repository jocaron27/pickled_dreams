import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsersOrders } from '../store/orders';


class UserOrders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMyOrders(this.props.userId)
  }
  render() {
    console.log(this.props)
    return (

      <div>
        HELLO

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.user.id
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMyOrders(id) {
      dispatch(fetchUsersOrders(id))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)