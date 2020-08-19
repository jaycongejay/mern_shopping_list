const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let User = require('../../models/User');
const auth = require('../../middleware/auth');
///////////////////////////////////////////////////////


/** Authentication when user LOG IN */

// POST request - LOGIN
router.post('/', (req, res) => {
    const { email, password } = req.body

    // Validation for the input from the UI
    if(!email || !password){
        return res.status(400).json({ msg: 'Please, Enter all fields'})
    }

    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User Does not exists'});

           // Validation for the password
           bcrypt.compare(password, user.password)
                 .then(match => {
                     if(!match) return res.status(400).json({ msg: 'Invalid credentials'});

                     jwt.sign( // If the password match
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,  // token here
                                user: { // user here
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    );
                 })
        });
});

// GET request - Get a User   / access PRIVATE
router.get('/user', auth, (req,res) => {
    User.findById(req.user.id)  // id is embedded in the token
        .select('-password') // disregard password
        .then(user => res.json(user));
});

module.exports = router;