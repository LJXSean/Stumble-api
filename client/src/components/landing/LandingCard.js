import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../img/icon.png';

const LandingCard = (props) => {
  return (
    <div className='card'>
      <h1>01</h1>
      <div className='cardItem'>
        <div className='cardHeader'>
          {' '}
          <img
            className='header-img'
            src={icon}
            alt='icon'
            style={{ color: '#e31616', height: '38px', objectFit: 'contain' }}
          />
          <span>Profile img and Name</span>
        </div>

        <h4>Post Txt</h4>
        <span>date</span>
      </div>
    </div>
  );
};

LandingCard.propTypes = {};

export default LandingCard;
