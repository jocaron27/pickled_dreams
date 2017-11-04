import React, {Component} from 'react';
import {connect} from 'react-redux'

export default class OrderForm extends Component{
  constructor(){
    super()
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
  }
  handleSubmitOrder(){} //grabs info provided from form and makes the post request

  render(){
    return (
      <div>
        <h1>Checkout</h1>
        <h2>Shipping Address</h2>
        <form onSubmit={this.handleSubmitOrder}>
          <label htmlFor="address">Address</label>
            <input type="text" name="address" placeholder="Enter shipping address..." value="" /> <br />
          <label htmlFor="city">City</label>
            <input type="text" name="city" placeholder="Enter city..." value=""/> <br />
          <label htmlFor="state">State</label>
            <input type="text" name="state" placeholder="Enter state..." value=""/> <br />
          <label htmlFor="zip-code">Zip Code</label>
            <input type="text" name="zip-code" placeholder="Enter zip code..." value=""/> <br /> <br />
          <label htmlFor="credit-card">Credit Card</label>
          <label htmlFor="CVC">CVC</label> <br />
          <div>
          <input type="number" name="credit-card" /> 
          <input type="number" name="CVC" placeholder="CVC"/>
          </div>
          <input type="submit" value="Submit Order"/>
        </form>
      </div>
    )
  }
}
