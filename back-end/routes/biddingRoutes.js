const auth = require ('../middleware/auth');
const admin = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const express = require ('express');
const router = express.Router();

const { addBidding,
        approveBidding,
        rejectBidding } = require ('../controllers/biddingController');

router.post ('/', auth, asyncMiddleware (addBidding));
router.post ('/approve', [auth, admin], asyncMiddleware (approveBidding));
router.post ('/reject', [auth, admin], asyncMiddleware (rejectBidding));

module.exports = router;