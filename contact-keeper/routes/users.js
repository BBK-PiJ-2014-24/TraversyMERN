const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/TravContact');


const validationList = [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'invalid email').isEmail(),
    check('password', 'Min Length').isLength({min: 6}),
];

// CREATE USER
// -----------
// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', validationList, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
                  .json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email});
        // Check if User Already Exists
        if(user){
            res.status(400)
               .json({msg: 'user already exists'});
        }

        // Create User Object ready for MongoDB upload
        user = new User({
            name,
            email,
            password
        });

        // hashed Password and Save
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // Prepare for JWT token
        const payload = {
            user: {
                id: user.id
            }
        };
       
        const jwtConfig = {
            expiresIn: 360000
        };

        jwt.sign(payload, config.get('jwtSecret'), jwtConfig, (err, token)=>{
            if(err) throw err;
            res.json({token});
        });


    } catch(err){
        console.log({msg: err.message});
        res.status(500).send('Server Error');
    }


});

module.exports = router;