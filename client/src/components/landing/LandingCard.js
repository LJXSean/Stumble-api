import React from 'react';
import PropTypes from 'prop-types';
import icon from '../../img/icon.png';
import formatDate from '../../utils/formatDate';

const LandingCard = ({
  posts: { avatar, name, title, date, comments, _id },
  i,
}) => {
  return (
    <div className='card'>
      <h1 className='cardIndex'>0{i + 1}</h1>
      <div className='cardItem'>
        <div className='cardHeader'>
          {' '}
          <img
            className='header-img'
            src={avatar}
            alt='icon'
            style={{ color: '#e31616', height: '38px', objectFit: 'contain' }}
          />
          <a href='profiles' className='link'>
            {name}
          </a>
        </div>

        <h4>
          <a href={`posts/${_id}`} className='link'>
            {title}
          </a>
        </h4>
        <span className='date'>{formatDate(date)}</span>
        <span className='date'>|| {comments.length} Comments</span>
      </div>
    </div>
  );
};

LandingCard.propTypes = {};

export default LandingCard;
