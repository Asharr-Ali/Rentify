const express = require ('express');
const auth = require ('../middleware/auth');
const { allowRole } = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const router = express.Router ();

const { getAllCustomers, 
        createCustomer,
        getCustomer } = require ('../controllers/customerController');

const { authenticateCustomer } = require ('../controllers/authenticateController');       

router.post ('/login', authenticateCustomer);
router.get ('/', [auth, allowRole ('admin')], asyncMiddleware(getAllCustomers));
router.post ('/', asyncMiddleware(createCustomer));
router.get ('/me', auth, asyncMiddleware(getCustomer));

module.exports = router;