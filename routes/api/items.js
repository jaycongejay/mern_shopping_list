const router = require('express').Router();
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');
///////////////////////////////////////////////////////


// GET request - Get all items - - PUBLIC ACCESS
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

// POST request - Add new item - PRIVATE ACCESS
router.post('/', auth, (req, res) => {
    const newItem = new Item({
                        name: req.body.name
                    });

    newItem.save().then(item => res.json(item))
});

// DELETE request - Delete a item - PRIVATE ACCESS
router.delete('/:id', auth, (req, res) => {
    
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})


module.exports = router;