import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

const PostBox = ({ auth: { isAuthenticated, user }, setAlert }) => {
  const navigate = useNavigate();
  const unknownAvatar =
    'https://s.gravatar.com/avatar/fbda8288fbc574fdaf49bb2a20feb837e61cebdba967686e0a69ff0ec3681500?s=80';

  return (
    <div className='create'>
      <img
        src={isAuthenticated && user ? user.avatar : unknownAvatar}
        alt=''
        className='create-img'
      />

      <input
        type='text'
        placeholder='Create Post'
        className='create-textbox create-input'
        onClick={() => navigate('/submit')}
      />
    </div>
  );
};

PostBox.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(PostBox);
