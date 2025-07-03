const express = require ('express');
const auth = require ('../middleware/auth');
const { allowRole } = require ('../middleware/admin');
const asyncMiddleware = require ('../middleware/async');
const router = express.Router ();

const { addFeedBack,
        getFeedBackByCarID } = require ('../controllers/feedbackController');

router.post ('/', [auth, allowRole ('customer')], addFeedBack);
router.get ('/', auth, asyncMiddleware(getFeedBackByCarID));

module.exports = router;