
module.exports.allowRole = function (role) {
    return (req, res, next) => {
        if (role == 'customer' && req.user.isAdmin == false) return next ();
        if (role == 'admin' && req.user.isAdmin == true) return next ();
        return res.status(403).send('Forbidden...Access Denied!');
    };
}