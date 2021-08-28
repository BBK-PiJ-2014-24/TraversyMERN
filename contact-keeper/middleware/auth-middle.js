const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =  function(req, res, next) {
    // Get Token from Header
    const token = req.header('x-auth-token');


    // Check for Token
    if(!token) {
        return res.status(401).json({msg: 'No Token'});
    }

    // Decrypt Token and add to req object 
    try {
        const decodedToken =  jwt.verify(token,  config.get('jwtSecret'));
        req.user = decodedToken.user;
        next();
    } catch(err) {
        res.status(401).json({msg: 'invalid token'});
    }

}