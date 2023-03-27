var express = require('express');
var router = express.Router();
var User = require('../models/register');
const bcrypt = require("bcryptjs");



router.post('/', async function (req, res) {
    console.log(req.body);
    if (req.body.email &&
        req.body.fullName &&
        req.body.username &&
        req.body.password
      ) {

    const u = await User.findOne({email: req.body.email});

        if(u) return res.status(400).send("User already exists!");
        console.log(u);

    req.body.picture = 'none';
    req.body.publicId = 'none';
    req.body.role = 'user';
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    User.create(req.body);

    res.send("User registered Successfully!");

} else {
    res.json({status: false, message: 'Your input details are not complete.'});
}

});



module.exports = router;
