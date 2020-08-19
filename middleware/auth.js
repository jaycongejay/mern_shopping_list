require('dotenv').config();
const jwt = require('jsonwebtoken');
///////////////////////////////////////////////////////


/** PROTECT routes with verifying Jwt */

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    // Check if token exist
    if(!token) {
        return res.status(401).json({ msg: 'Cannot find token, authorization denied'});
    }


    try{
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        // Add user from payload
        req.user = decoded;
        next();

    }catch(e){
        res.status(400).json({ msg: 'Token is not valid'});
    }
}

module.exports = auth;