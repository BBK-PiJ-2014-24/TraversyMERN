const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/TravUser');
const auth = require('../middleware/auth-middle');

const validationList = [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password Rewquired').exists()
];

// GET USER
// --------
// @route: GET api/auth
// @desc: Get logged in user
// @access: Private, protected by auth middlware
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password'); // we dont wan the password
        res.json(user);
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error During Login');
    }
});

// LOGIN
// -----
// @route: POST api/auth
// @desc:  Auth user and get token
// @access: Public
router.post('/', [validationList], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400)
                  .json({errors: errors.array()});
    }
    
    const {email, password} = req.body;

    try{
        console.log(email, password);
        let user = await User.findOne({email});

        // check Login Conditions
        if(!user){
            return res.status(400).json({msg: "Invalid User Credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'Invalied Password Credentials' });
        }

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
            console.log('logged In', email);
            res.json({token});
        } );

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;