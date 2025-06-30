const auth = require ('../middleware/auth');
const admin = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addCar,
        updateCar, 
        removeCar } = require ('../controllers/carController');

router.post ('/', [auth, admin], asyncMiddleware (addCar));
router.put ('/', [auth, admin], asyncMiddleware (updateCar));
router.delete ('/', [auth, admin], asyncMiddleware (removeCar));

module.exports = router;