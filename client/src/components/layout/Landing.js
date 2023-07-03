import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import { useSpring, animated } from 'react-spring';

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.span className='highlight-text'>
      {number.to((n) => n.toFixed(0))}
    </animated.span>
  );
}

const Landing = ({ isAuthenticated, profiles, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Stumble</h1>
          <p className='lead'>
            Create a student profile/portfolio, find the best groupmates for
            your modules, get help from <Number n={profiles.length} /> other
            developers
          </p>
          <div className='buttons'>
            <Link to='register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  profiles: PropTypes.number,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Landing);
