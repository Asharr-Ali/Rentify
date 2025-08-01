const bcrypt = require ('bcrypt');
const _ = require ('lodash');
const { Customer, 
        validate } = require ('../models/customer');

//Get All Customers
const getAllCustomers = async function (req, res) {
    const customers = await Customer.find();
    if (!customers) return res.status(404).send('No Customer Found!');
    return res.send(customers);
}

//Add Customer
const createCustomer = async function (req, res) {
    const { error } = validate (req);
    if (error) return res.status(400).send (error.details[0].message); 

    const dupCustomer = await Customer.findOne ({ email: req.body.email });
    if (dupCustomer) return res.status(400).send('Customer Already Added!');

    const customer = new Customer ({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin
    });
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(customer.password, salt);

    await customer.save ();

    const token = customer.generateAuthToken();
    res.header('x-auth-token', token).header('access-control-expose-headers', 'x-auth-token').send (_.pick(customer, ['name', 'email']));
}

//Get Customer Details 
const getCustomer = async function (req, res) {
    const customer = await Customer.findById (req.user._id).select('-password');
    if (!customer) return res.status(404).send('Customer does not exist!');
    res.send (customer);
}

module.exports = { getAllCustomers,
                    createCustomer, 
                    getCustomer };