const express = require('express');
const router = express.Router();

const customerController = require('../controllers/loginSystem')

router.post('/signupuser',customerController.SignUp)
router.post('/loginUser',customerController.LoginUser)
router.post('/forget-password',customerController.forget_password)
module.exports = router;