const auth = require ('../middleware/auth');
const { allowRole } = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addBidding,
        getCarBiddingsByCustomerID,
        getCarBiddingsByAdminID,
        approveBidding,
        rejectBidding } = require ('../controllers/biddingController');

router.post ('/', [auth, allowRole ('customer')], asyncMiddleware (addBidding));
router.post ('/getBiddings', auth, asyncMiddleware (getCarBiddingsByCustomerID));
router.get ('/', [auth, allowRole ('admin')], asyncMiddleware (getCarBiddingsByAdminID));
router.post ('/approve', [auth, allowRole ('admin')], asyncMiddleware (approveBidding));
router.post ('/reject', [auth, allowRole ('admin')], asyncMiddleware (rejectBidding));

module.exports = router;