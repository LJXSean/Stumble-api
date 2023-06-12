const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header (why x-auth-token, when was it saved here)
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token, get payload from decoded token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Adds a user object to req of the route calling the auth middleware
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token not valid'});
    }
};