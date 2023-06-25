import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

//Initial state contains objects of the format: {Id, msg, alertType}
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      // State is immutable, need to make a copy and append to that copy
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
