import axios from 'axios';

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
export function submitOrderThunk(id, order) {
  return function thunk(dispatch) {
    return axios.post(`/api/orders/${id}`, order)
  }
}

const reducer = function (state = initialState, action) {

  switch (action.type) {
    case WRITE_ADDRESS:
      return action.address;
    case WRITE_CITY:
      return action.city;
    case WRITE_STATE:
      return action.stateOfCity;
    case WRITE_ZIPCODE:
      return action.zipCode;
    case WRITE_CCN:
      return action.ccn;
    case WRITE_CVC:
      return action.cvc;
    case SUBMIT_ORDER:
      return;
    default:
      return state;
  }
}
export default reducer;
