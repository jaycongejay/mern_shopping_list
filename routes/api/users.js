const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
let User = require('../../models/User');
///////////////////////////////////////////////////////


// GET request - Get all users
router.route('/').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST request - Add new user
router.route('/').post((req, res) => {
    const { name, email, password } = req.body

    // Validation for the input from the UI
    if(!name || !email || !password){
        return res.status(400).json({ msg: 'Please, Enter all fields'})
    }

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                name,
                email,
                password
            });

            // Bcrypt
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                            .then(user => {
                                jwt.sign(
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
                            });
                });
            });
        });
});

module.exports = router;