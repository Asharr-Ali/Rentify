const auth = require ('../middleware/auth');
const admin = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addBooking,
        futureBookings,
        pastBookings,
        removeBooking } = require ('../controllers/bookingController');

router.post ('/', auth, asyncMiddleware (addBooking));
router.get ('/', auth, asyncMiddleware (futureBookings));
router.get ('/history', auth, asyncMiddleware (pastBookings));
router.delete ('/', auth, asyncMiddleware (removeBooking));

module.exports = router;