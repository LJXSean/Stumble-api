import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// Method called when registering users
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    // If header has spelling errors, backend receives empty body JSON object
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    // res.data and err.response.data contains the JSON response object
    try {
      const res = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      // errors object sent by backend,
      // contains an array of objects with a msg field (see /api/users)
      const errors = err.response.data.errors;
      console.log(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
