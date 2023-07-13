import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import { useSpring, animated } from 'react-spring';
import './landing.css';
import LandingCard from './LandingCard';
import { getPosts } from '../../actions/post';

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

const Landing = ({
  isAuthenticated,
  profiles,
  getProfiles,
  getPosts,
  post: { posts },
}) => {
  useEffect(() => {
    getProfiles();
    getPosts();
  }, [getProfiles, getPosts]);

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Connect with others</h1>
            <p className='lead'>
              Create a student profile/portfolio, find the best groupmates for
              your modules, get help from <Number n={profiles.length} /> other
              developers
            </p>
            <div className='buttons'>
              <Link to='register' className='my-btn primary-btn'>
                Sign Up
              </Link>
              <Link to='login' className='my-btn sec-btn'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <h4 className='subTitle'>
        <i class='fa-solid fa-arrow-trend-up' style={{ color: '#149bc8' }}></i>{' '}
        Trending on Stumble
      </h4>
      <div className='cards-container'>
        {posts
          .sort((a, b) => b.comments.length - a.comments.length)
          .map((post, index) => (
            <LandingCard posts={post} i={index} />
          ))}
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  profiles: PropTypes.number,
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  profiles: state.profile.profiles,
  post: state.post,
});

export default connect(mapStateToProps, { getProfiles, getPosts })(Landing);
