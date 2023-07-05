import { LOGOUT } from '../actions/types';
import { appReducer } from './root';

export default (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};
