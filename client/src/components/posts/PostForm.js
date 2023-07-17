import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ addPost }) => {
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const navigate = useNavigate();

  const handleTabKeyPress = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      // Get the current cursor position
      const { selectionStart, selectionEnd } = e.target;

      // Insert four spaces at the cursor position
      const newBody =
        body.substring(0, selectionStart) +
        '    ' +
        body.substring(selectionEnd);

      setBody(newBody);
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

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
          <input
            name='title'
            className='create-formbox'
            type='text'
            cols='30'
            rows='1'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleEnterKeyPress}
            required
          ></input>
          <textarea
            name='body'
            className='create-formbox'
            cols='30'
            rows='10'
            placeholder='Text (optional)'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleTabKeyPress}
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
