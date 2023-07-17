import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ addPost }) => {
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const navigate = useNavigate();

  return (
    <div className='container'>
      {' '}
      <div class='post-form'>
        <div class='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form
          class='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ title, body });
            setTitle(' ');
            setBody(' ');
            navigate('/posts');
          }}
        >
          <textarea
            name='title'
            className='create-formbox'
            cols='30'
            rows='1'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></textarea>
          <textarea
            name='body'
            className='create-formbox'
            cols='30'
            rows='10'
            placeholder='Text (optional)'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <input type='submit' class='btn btn-dark my-1' value='Submit'></input>{' '}
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
