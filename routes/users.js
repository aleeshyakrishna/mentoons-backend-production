var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const authentication = require('../middlewares/jwtAuth')
const { memoryStorage } = require('multer');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//signup 

router.get('/',userController.getHome)
router.post('/signup',upload.none(),userController.signup)
router.post('/login',upload.none(),userController.userLogin)
router.get('/products',userController.getProduct)
router.get('/prodView/:id',userController.getOneProd)
router.get('/getCatProduct/:id',userController.getCatProd)
router.get('/getCategory',userController.getAllCategory)
router.get('/getOneCategory/:id',userController.getOneCategory)
router.post('/addToCart',authentication.authenticateToken,userController.addToCart)
router.post('/removeCartItem',authentication.authenticateToken,userController.RemoveCart)
router.get('/getCart/:userId',authentication.authenticateToken,userController.getCart)
router.post('/writeUs',userController.writeUs)
router.post('/hireme',authentication.authenticateToken,userController.hireMe)
router.post('/workshopForm',userController.workShop)
// router.post('/sendOtp',userController.sendOtp)
// router.delete('/deleteAccount/:userId',authentication.authenticateToken,userController)

module.exports = router;
