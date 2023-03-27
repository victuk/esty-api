var express = require("express");
var router = express.Router();
const crypto = require("crypto");
const fs = require("fs");
const multer = require("multer");
const { upload } = require("./multerStorage");

function encryptText (plainText) {
  return crypto.publicEncrypt({
    key: fs.readFileSync('public_key.pem', 'utf8'),
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  },
  // We convert the data string to a buffer
  Buffer.from(plainText)
  )
}

router.post("/", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), async function(req, res) {

});

module.exports = router;