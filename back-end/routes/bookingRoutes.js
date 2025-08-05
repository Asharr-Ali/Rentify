const auth = require ('../middleware/auth');
const { allowRole } = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addBooking,
        futureBookings,
        pastBookings,
        removeBooking,
        removeAllBookings,
        futureBookingsByAdminID } = require ('../controllers/bookingController');

router.post ('/', [auth, allowRole ('admin')], asyncMiddleware (addBooking));
router.get ('/future', [auth, allowRole ('customer')], asyncMiddleware (futureBookings));
router.get ('/history', [auth, allowRole ('customer')], asyncMiddleware (pastBookings));
router.delete ('/', auth, asyncMiddleware (removeBooking));
router.delete ('/removeAll', [auth, allowRole ('admin')], asyncMiddleware (removeAllBookings));
router.get ('/admin/future', [auth, allowRole ('admin')], asyncMiddleware (futureBookingsByAdminID));

module.exports = router;