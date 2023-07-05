import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, title, body, avatar, user, likes, comments, date },
  showActions,
}) => {
  const color = likes.some((like) => user === like.user) ? '#FF4433' : '#000';
  console.log(color);

  return (
    <a href={`/posts/${_id}`}>
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
              <span className='btn'>
                <i class='fa-solid fa-comment'></i>{' '}
                {comments.length > 0 && <span>{comments.length} Comment</span>}
              </span>
              {auth.isAuthenticated &&
                !auth.isLoading &&
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
    </a>
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
