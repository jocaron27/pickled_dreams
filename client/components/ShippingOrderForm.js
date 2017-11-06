import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  orderSubmission,
  writeAddress,
  writeCity,
  writeState,
  writeCCN,
  writeCVC,
  writeZipCode
} from '../store/order-form';


//NEED TO DO SOMETHING WITH CCN AND CVC DOWN IN THE MAPDISPATCH
class OrderForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      address,
      city,
      stateOfCity,
      zipCode,
      ccn,
      cvc,
      handleAddress,
      handleCity,
      handleState,
      handleZipCode,
      handleCCN,
      handleCVC,
      handleOrderSubmission
    } = this.props

    return (
      <div id="shipping-form">
        <div>
          <h1>Checkout</h1>
          <h2>Shipping Address</h2>
          <form onSubmit={handleOrderSubmission}>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" placeholder="Enter shipping address..." value={address} onChange={handleAddress} /> <br />
            <label htmlFor="city">City</label>
            <input type="text" name="city" placeholder="Enter city..." value={city} onChange={handleCity} /> <br />
            <label htmlFor="state">State</label>
            <input type="text" name="state" placeholder="Enter state..." value={stateOfCity} onChange={handleState} /> <br />
            <label htmlFor="zip-code">Zip Code</label>
            <input type="text" name="zip-code" placeholder="Enter zip code..." maxLength="5" value={zipCode} onChange={handleZipCode} /> <br /> <br />
            <label htmlFor="credit-card">Credit Card</label><label htmlFor="CVC">CVC</label> <br />
            <div>
              <input type="text" name="credit-card" maxLength="16" value={ccn} onChange={handleCCN} />
              <input type="text" name="CVC" placeholder="CVC" maxLength="4" value={cvc} onChange={handleCVC} />
            </div>
            <button type="submit">Submit Order</button>
          </form>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    address: state.orderForm.address,
    city: state.orderForm.city,
    stateOfCity: state.orderForm.stateOfCity,
    zipCode: state.orderForm.zipCode,
    ccn: state.orderForm.ccn,
    cvc: state.orderForm.cvc
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleOrderSubmission(event) {
      event.preventDefault()
      const address = event.target.address.value
      const city = event.target.city.value
      const stateOfCity = event.target.state.value
      const order = { shippingAddress: `${address} ${city}, ${stateOfCity}` }
      dispatch(orderSubmission(order))
    },
    handleAddress(event) {
      dispatch(writeAddress(event.target.value))
    },
    handleCity(event) {
      dispatch(writeCity(event.target.value))
    },
    handleState(event) {
      dispatch(writeState(event.target.value))
    },
    handleZipCode(event) {
      dispatch(writeZipCode(event.target.value))
    },
    handleCCN(event) {
      dispatch(writeCCN(event.target.value))
    },
    handleCVC(event) {
      dispatch(writeCVC(event.target.value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
