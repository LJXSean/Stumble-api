import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

// Only checks first time if user loaded
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  // useEffect only runs when app is loaded/mounted due to []
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          {/* <Route path='profiles' element={<Profiles />} />
        <Route path='profile/:id' element={<Profile />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
