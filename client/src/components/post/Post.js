import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import FullPost from './FullPost';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
const Post = ({ getPost, post: { post, isLoading, error } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost]);

  return (
    <section className='container'>
      {error.status === 404 ? (
        <span>ERROR: Cannot Find Post</span>
      ) : isLoading || post === null ? (
        <Spinner />
      ) : (
        <>
          <Link to='/posts' className='btn'>
            Back To Posts
          </Link>
          <FullPost id={id} post={post} />
          <CommentForm postId={post._id} />
          <div className='comments'>
            {post.comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
