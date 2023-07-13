import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import PostCard from './PostCard';
import PostBox from './PostBox';

const Posts = ({ getPosts, post, isAuthenticated }) => {
  const { posts, isLoading } = post;
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className='container'>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community
          </p>
          {isAuthenticated && <PostBox />}
          {posts.length > 0 && (
            <div className='posts'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPosts })(Posts);
