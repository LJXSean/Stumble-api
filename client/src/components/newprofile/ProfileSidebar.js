import React from 'react';
import PropTypes from 'prop-types';
import './profile.css';

const ProfileSidebar = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='layout-sidebar'>
      <img className='round-img my-1 img-border' src={avatar} alt='' />
      <h1 className='p-name'>{name}</h1>
      <p className='p-desc'>
        {status} {company && <span> at {company}</span>}
      </p>
      <button className='p-btn'>Edit Profile</button>{' '}
      <p>{location && <span>{location}</span>} </p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}

        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className={`fab fa-${key} fa-2x p-icon`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileSidebar.propTypes = {};

export default ProfileSidebar;
