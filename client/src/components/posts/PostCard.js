import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

function commentLabel(n) {
  const label = n > 1 ? 'Comments' : 'Comment';
  return (
    <span>
      {n} {label}
    </span>
  );
}
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, title, avatar, user, likes, comments, date },
  showActions,
}) => {
  let color = '#000';
  if (auth.isAuthenticated && !auth.isLoading && auth.user) {
    color = likes.some((like) => auth.user._id === like.user)
      ? '#2E8B57'
      : '#000';
  }

  return (
    <div className='fragment'>
      <a className='postLink' href={`/posts/${_id}`} />
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <h2 className='my-1'>{title}</h2>
          <p className='post-date'>Posted on {formatDate(date)}</p>

          {showActions && (
            <>
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
              <a className='btn' href={`/posts/${_id}`}>
                <i class='fa-solid fa-comment'></i>{' '}
                {comments.length > 0 && commentLabel(comments.length)}
              </a>
              {auth.isAuthenticated &&
                !auth.isLoading &&
                auth.user &&
                user === auth.user._id && (
                  <button
                    onClick={() => deletePost(_id)}
                    type='button'
                    className='btn btn-danger'
                  >
                    <i className='fas fa-times'></i>
                  </button>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
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
  PostItem
);
