import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../img/icon.png';

const LandingCard = (props) => {
  return (
    <div className='card'>
      <h1 className='cardIndex'>01</h1>
      <div className='cardItem'>
        <div className='cardHeader'>
          {' '}
          <img
            className='header-img'
            src={icon}
            alt='icon'
            style={{ color: '#e31616', height: '38px', objectFit: 'contain' }}
          />
          <a href='profiles' className='link'>
            Profile img and Name
          </a>
        </div>

        <h4>
          <a href='posts' className='link'>
            What do you guys think about CS2103T?
          </a>
        </h4>
        <span className='date'>Jun 9</span>
        <span className='date'>|| 12 Comments</span>
      </div>
    </div>
  );
};

LandingCard.propTypes = {};

export default LandingCard;
