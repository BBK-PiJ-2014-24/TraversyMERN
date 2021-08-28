const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/TravContact');
const Contact = require('../models/TravUser');
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
router.post('/', (req, res) => {
    res.send('add contact');
});

// UPDATE
// ------
// @route: POST api/contacts/:id
// @desc: Update contact
// @access: private
router.post('/:id', (req, res) => {
    res.send('update contact');
});

// DELETE
// ------
// @route: DELETE api/contacts/:id
// @desc: Update contact
// @access: private
router.delete('/:id', (req, res) => {
    res.send('delete contact');
});

module.exports = router;