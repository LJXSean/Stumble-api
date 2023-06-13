const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// comment format: <REQ TYPE> <ENDPOINT>

// @route   GET api/auth
// @desc    Returns user details
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    // Get user details excluding the password
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token to allow access to private routes
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists (findOne document matching condition of email = email)
      let user = await User.findOne({ email });

      if (!user) {
        // Format error message to match validation errors above
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Return same error message for no user/invalid password for security purposes
        return res
          .status(400)
          .json({ error: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken -> To log in user immediately after signing up for account
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          // Send jwtToken if no errors (default status code of 200)
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
