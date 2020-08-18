const router = require('express').Router();
const Item = require('../../models/Item');
// const bcrypt = require('bcryptjs');
// const config = require('config');
// const jwt = require('jsonwebtoken');

// GET request
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// POST request
router.post('/', (req, res) => {
    const newItem = new Item({
                        name: req.body.name
                    });

    newItem.save().then(item => res.json(item))
});

// DELETE request
router.delete('/:id', (req, res) => {
    
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})




// POST request
// router.route('/add').post((req, res) => {
//     const { username, email, password } = req.body

//     // Validation for the input from the UI
//     if(!username || !email || !password){
//         return res.status(400).json({ msg: 'Please, Enter all fields'})
//     }

//     User.findOne({ email })
//         .then(user => {
//             if(user) return res.status(400).json({msg: 'User already exists'});

//             const newUser = new User({
//                 username,
//                 email,
//                 password
//             });

//             // Bcrypt
//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) => {
//                     if(err) throw err;
//                     newUser.password = hash;
//                     newUser.save()
//                             .then(user => {
//                                 jwt.sign(
//                                     { id: user.id },
//                                     config.get('jwtSecret'),
//                                     { expiresIn: 3600 },
//                                     (err, token) => {
//                                         if(err) throw err;
//                                         res.json({
//                                             token,  // token here
//                                             user: { // user here
//                                                 id: user.id,
//                                                 username: user.username,
//                                                 email: user.email
//                                             }
//                                         });
//                                     }
//                                 );
//                             });
//                 });
//             });
//         });
// });

module.exports = router;