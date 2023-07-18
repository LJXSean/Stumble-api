import React from 'react';
import PropTypes from 'prop-types';

const ProjectCards = ({ project: { title, description, tags } }) => {
  return (
    <div className='project-card'>
      <a
        className='card-title'
        href='https://github.com/LJXSean'
        target='_blank'
      >
        {title}
      </a>
      <p className='card-description'>{description}</p>
      {tags.map((tag) => (
        <span className='card-tag'>{tag}</span>
      ))}
    </div>
  );
};

ProjectCards.propTypes = {};

export default ProjectCards;
