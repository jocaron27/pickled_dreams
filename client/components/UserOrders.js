import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsersPastOrders } from '../store/orders';


class UserOrders extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMyOrders()
  }
  render() {///messy needs testing
    console.log(this.props)
    return (
      <div>
        <ul>
          {
            this.props.pastOrders && this.props.pastOrders.map((pastOrder, index) => {
              return (
                <div class="past-order-list-item" key={index}>
                  <hr />
                  <li>
                    <div>
                      <ul>
                        <li>
                          {pastOrder.products.name}
                        </li>
                        <li>
                          {pastOrder.total}
                        </li>
                      </ul>
                    </div>
                  </li>
                  <hr />
                </div>
              )

            })

          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    pastOrders: state.pastOrders
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getMyOrders() {
      dispatch(fetchUsersPastOrders())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserOrders)