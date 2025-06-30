const config = require ('config');

module.exports = function () {
    //Check if out JWTPrivate key is set
    if (!config.get('JWT_PRIVATE_KEY')) {
        throw new Error ('FATAL ERROR: JwtPrivateKey not Defined!');
    }
}