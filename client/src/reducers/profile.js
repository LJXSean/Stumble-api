// profile: user profile/profile visited
// profiles: list of profiles on developer's page

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  isLoading: true,
  error: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        isLoading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        isLoading: true,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
