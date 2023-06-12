// Post requests to API/Users
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); 
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// comment format: <REQ TYPE> <ENDPOINT>

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', 
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Please enter a valid password with 6 or more characters').isLength({ min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists (findOne document matching condition of email = email)
            let user = await User.findOne({ email });

            if (user) {
                // Format error message to match validation errors above
                return res.status(400).json({ error: [{"msg": "User already exists"}]});
            }

            // Get user's gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'monsterid'
            });
            
            // Creates model instance (not saved yet)
            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password 
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            console.log(user.password)
            // Return jsonwebtoken -> To log in user immediately after signing up for account
            const payload = {
                user: {
                    id: user.id
                }
            };
            
            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    // Send jwtToken if no errors (default status code of 200)
                    if (err) throw err;
                    return res.json({ token });
                }
            );
            
            // User only saved if no problems
            await user.save();
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

});

module.exports = router; 

