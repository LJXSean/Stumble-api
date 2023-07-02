// profile: user profile/profile visited
// profiles: list of profiles on developer's page

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  LOGOUT,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        isLoading: true,
      };
    default:
      return state;
  }
}
