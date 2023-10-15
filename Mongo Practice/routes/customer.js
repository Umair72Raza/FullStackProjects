const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer')

router.post('/createacustomer',customerController.enterCustomer)
router.get('/getallcustomers',customerController.allCustomers)
router.get('/getcustomerbyid/:id',customerController.getById)
router.delete('/deletebyid/:id',customerController.deleteCustomerById)
module.exports = router;