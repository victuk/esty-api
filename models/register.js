const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;
const RegisterSchema = new Schema({
    fullName: String,
    email: String,
    picture: String,
    publicId: String,
    password: String,
    role: String
}, {timestamps: true});

const User = mongoose.model('User', RegisterSchema);
module.exports = User;

module.exports.createUser = (newUser, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (error, hash) => {
            // store the hashed password
            const newUserResource = newUser;
            newUserResource.password = hash;
            newUserResource.save(callback);
        });
    });
};

module.exports.getUserByEmail = (email, callback) => {
    const query = { email };
    User.findOne(query, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};
