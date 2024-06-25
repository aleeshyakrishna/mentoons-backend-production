// routes/admins.js
var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');
const { memoryStorage } = require('multer');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/login', adminController.postLogin);
router.post('/addCategory',adminController.postCategory)
router.post('/addAgeCategory',adminController.postAgeCategory)
// router.post('/addProducts', upload.single('thumbnail'), adminController.postProduct);
router.post('/addProducts', upload.fields([{ name: 'thumbnail' }, { name: 'source' }]), adminController.postProduct);

router.post('/addOpening',adminController.addOpening)


module.exports = router;
