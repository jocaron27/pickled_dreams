import axios from 'axios';
import {fetchOrder} from './cart';

const WRITE_ADDRESS = 'WRITE_ADDRESS';
const WRITE_CITY = 'WRITE_CITY';
const WRITE_STATE = 'WRITE_STATE';
const WRITE_ZIPCODE = 'WRITE_ZIPCODE';
const WRITE_CCN = 'WRITE_CCN';
const WRITE_CVC = 'WRITE_CVC';
const SUBMIT_ORDER = 'SUBMIT_ORDER';

const initialState = {
  address: '',
  city: '',
  stateOfCity: '',
  zipCode: '',
  ccn: '',
  cvc: ''
}

export function writeAddress(address) {
  const action = { type: WRITE_ADDRESS, address };
  return action;
}
export function writeCity(city) {
  const action = { type: WRITE_CITY, city };
  return action;
}
export function writeState(stateOfCity) {
  const action = { type: WRITE_STATE, stateOfCity };
  return action;
}
export function writeZipCode(zipCode) {
  const action = { type: WRITE_ZIPCODE, zipCode };
  return action;
}
export function writeCCN(ccn) {
  const action = { type: WRITE_CCN, ccn };
  return action;
}
export function writeCVC(cvc) {
  const action = { type: WRITE_CVC, cvc };
  return action;
}
export function submitOrder(order) {
  const action = { type: SUBMIT_ORDER, order };
  return action;
}
///THUNK CREATOR///
export function orderSubmission(order) {
  return function thunk(dispatch) {
    return axios.put(`/api/orders/submit`, order)
      .then(() => dispatch(fetchOrder()))
  }
}

const reducer = function (state = initialState, action) {

  switch (action.type) {
    case WRITE_ADDRESS:
      return Object.assign({}, state, { address: action.address });
    case WRITE_CITY:
      return Object.assign({}, state, { city: action.city })
    case WRITE_STATE:
      return Object.assign({}, state, { stateOfCity: action.stateOfCity });
    case WRITE_ZIPCODE:
      return Object.assign({}, state, { zipCode: action.zipCode })
    case WRITE_CCN:
      return Object.assign({}, state, { ccn: action.ccn })
    case WRITE_CVC:
      return Object.assign({}, state, { cvc: action.cvc })
    case SUBMIT_ORDER:
      return;
    default:
      return state;
  }
}
export default reducer;
