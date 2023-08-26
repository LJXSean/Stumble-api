import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Uses React router to redirect to login page on protected endpoints if not logged in
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading },
}) => {
  if (isAuthenticated || isLoading) return <Component />;

  return <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
