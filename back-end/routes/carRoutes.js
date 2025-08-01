const auth = require ('../middleware/auth');
const { allowRole } = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addCar,
        getAvailableCars,
        getAdminAddedCars,
        updateCar, 
        removeCar } = require ('../controllers/carController');

router.post ('/', [auth, allowRole ('admin')], asyncMiddleware (addCar));
router.get ('/', [auth, allowRole ('customer')], getAvailableCars);
router.get ('/admin-cars', [auth, allowRole ('admin')], getAdminAddedCars);
router.put ('/', [auth, allowRole ('admin')], asyncMiddleware (updateCar));
router.delete ('/', [auth, allowRole ('admin')], asyncMiddleware (removeCar));

module.exports = router;