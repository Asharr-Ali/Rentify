const config = require ('config');
const jwt = require ('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send ('Access Denied! No Token provided...');

    try {
        const decoded = jwt.verify (token, config.get ('JWT_PRIVATE_KEY'));
        req.user = decoded;
        next ();
    }
    catch (err) {
        res.status(400).send ('Invalid Token!');
    }
}