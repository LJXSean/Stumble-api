import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const FullPost = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, title, body, avatar, user, likes, comments, date },
  showActions,
}) => {
  const color = likes.some((like) => user === like.user) ? '#FF4433' : '#000';

  return (
    <div className='full-post'>
      <div className='full-post-header'>
        <Link to={`/profile/${user}`}>
          <img className='header-img' src={avatar} alt='' />
        </Link>
        <i className='fas fa-dot-circle header-element'></i>
        <span className='post-date  header-element'>
          Posted on {formatDate(date)} by {name}
        </span>
      </div>

      <h1 className='full-post-title'>{title}</h1>
      <div>
        <span className='full-post-tag'>Insert tag here </span>
      </div>

      {body && <p className='full-post-body'>{body}</p>}

      <div className='full-post-body'>
        <button
          onClick={() => addLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-up' style={{ color: color }}></i>{' '}
          <span>{likes.length}</span>
        </button>
        <button
          onClick={() => removeLike(_id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        {auth.isAuthenticated && !auth.isLoading && user === auth.user._id && (
          <button
            onClick={() => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

FullPost.defaultProps = {
  showActions: true,
};

FullPost.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  FullPost
);
