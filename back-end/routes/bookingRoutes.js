const auth = require ('../middleware/auth');
const { allowRole } = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addBooking,
        futureBookings,
        pastBookings,
        removeBooking } = require ('../controllers/bookingController');

router.post ('/', [auth, allowRole ('admin')], asyncMiddleware (addBooking));
router.get ('/future', [auth, allowRole ('customer')], asyncMiddleware (futureBookings));
router.get ('/history', [auth, allowRole ('customer')], asyncMiddleware (pastBookings));
router.delete ('/', [auth, allowRole ('admin')], asyncMiddleware (removeBooking));

module.exports = router;