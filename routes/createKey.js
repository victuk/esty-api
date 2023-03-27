var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key


router.get("/", async function(req, res, next) {
    try {
        const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
            // The standard secure default length for RSA keys is 2048 bits
            modulusLength: 2048,
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;
