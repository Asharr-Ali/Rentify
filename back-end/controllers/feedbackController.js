const { Feedback, 
    validate } = require ('../models/feedback');

const mongoose = require ('mongoose');

//Paste FeedBack
const addFeedBack = async function (req, res) {
    const { error } = validate (req);
    if (error) return res.status (400).send (error.details [0].message);

    const feedback = {
        customer_id: req.user._id,
        car_id: req.body.car_id
    }

    const dupFeedBack = await Feedback.findOne (feedback);
    if (dupFeedBack) return res.status (400).send ('FeedBack Already Recorded!');

    feedback.rating = req.body.rating;
    feedback.review = req.body.review;

    const newFeedback = new Feedback (feedback);
    await newFeedback.save ();
    res.send ('Feedback Recorded Successfully!');
}

//Get Feedbacks By Car ID
const getFeedBackByCarID = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid (req.body._id)) return res.status (400).send ('Invalid Car ID!');

    const feedbacks = await Feedback.find ({ car_id: req.body._id })
                              .populate ('customer_id', 'name');
    if (!feedbacks.length) return res.status (404).send ('No FeedBack for this Car!');
    res.send (feedbacks);
}

module.exports = { addFeedBack,
                    getFeedBackByCarID };