const bcrypt = require ('bcrypt');
const Joi = require ('joi');
const { Customer } = require ('../models/customer');

function validate (req) {
       const schema = new Joi.object ({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
       });
       return schema.validate(req.body);
}

const authenticateCustomer = async function (req, res) {
    const { error } = validate (req);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findOne ({ email: req.body.email });
    if (!customer) return res.status(404).send ('No Customer Found!');

    if (await bcrypt.compare (req.body.password, customer.password)) {
        const token = customer.generateAuthToken();
        return res.send (token);
    }
    return res.status(400).send ('Either Email or Password is invalid!'); 
}

module.exports = { authenticateCustomer };