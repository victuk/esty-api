var express = require('express');
var router = express.Router();
var regUser = require('../models/register');
require('dotenv').config();
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = process.env.secretkey;
const bcrypt = require("bcryptjs");

router.post('/', async (req, res) => {
    console.log(req.body);
    if (!req.body.email || !req.body.password) {return res.status(400).json({message: "Incomplete input"});}
        const email = req.body.email;
        const password = req.body.password;

        const user = await regUser.findOne({email});

        if (!user) {
            return res.status(404).json({ status: false, message: 'The user does not exist!' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (isMatch) {
            if (user.role == 'user' || user.role == 'admin') {
                const payload = { id: user.id, role: user.role};
                const token = jwt.sign(payload, jwtOptions.secretOrKey, {
                    expiresIn: '24h'
                });
                res.json({ status: true, token, email: user.email, role: user.role });
            }

        } else {
            res.status(401).json({
                status: false,
                message: 'The password is incorrect!'
            });
        }

});

module.exports = router;
