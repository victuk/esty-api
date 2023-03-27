var express = require("express");
var router = express.Router();
const multer = require("multer");
const { upload } = require("./multerStorage");


function decryptText (encryptedText) {
    return crypto.privateDecrypt(
      {
        key: fs.readFileSync('private_key.pem', 'utf8'),
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      encryptedText
    )
  }

router.post("/", upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), async function(req, res) {

});

module.exports = router;