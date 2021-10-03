const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Contact = require('../models/TravContact');
const User = require('../models/TravUser');
const auth = require('../middleware/auth-middle');

// READ
//-----
// @route: GET api/contacts
// @desc: Get user's contacts
// @access: Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id})
                                      .sort({date: -1}); 
        res.json(contacts);                              
    } catch(err) {
        res.status(500).send('Server Error');
    }
});

// CREATE
// ------
// @route: POST api/contacts
// @desc: add new contact
// @access: private
const validation = check('name', 'Name is required').not().isEmpty();
router.post('/', [auth, validation], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
                  .json({errors: errors.array()});
    }
    // get data  from req body
    const {name, email, phone, type} = req.body;
    console.log("name", name); // +++++++=====+++++++=

    // prepare data as obj to insert into db
    try {
        const newContact = new Contact({
            name,
            email,
            phone, 
            type,
            user: req.user.id
        });
        const contact = await newContact.save(); // save to DB
        res.json(contact); // send contact obj back to client

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error on Creating New Contact')
    }

});

// UPDATE
// ------
// @route: POST api/contacts/:id
// @desc: Update contact
// @access: private
router.put('/:id', auth, async (req, res) => {
    const {name, email, phone, type} = req.body;

    // Build contact obj
    const obj ={};
    if(name) obj.name = name;
    if(email) obj.email = email;
    if(phone) obj.phone = phone;
    if(type) obj.type = type;


    try {
        let contact = await Contact.findById(req.params.id);
        // check if user exists
        if(!contact){
            return res.status(404).json({msg: 'Contact Not Found'});
        }
        // check contact is in user obj
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorized to Edit'});
        }
        // update db
        contact = await Contact.findByIdAndUpdate(req.params.id,
                                                  {$set: obj},
                                                  {new: true});
        // Send back to client
        res.json({contact});

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error on Editing Contact');
    }
});

// DELETE
// ------
// @route: DELETE api/contacts/:id
// @desc: Update contact
// @access: private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        // check if user exists
        if(!contact){
            return res.status(404).json({msg: 'Contact Not Found'});
        }
        // check contact is in user obj
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'Not Authorized to Edit'});
        }
        // update db
        await Contact.findByIdAndRemove(req.params.id);
        // Send back to client
        res.json({msg: 'Contact Removed'});

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error on Editing Contact');
    }
});

module.exports = router;