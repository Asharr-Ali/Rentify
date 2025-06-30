const request = require ('supertest');
const { Customer } = require ('../../models/customer');
const mongoose = require ('mongoose');

let server;

describe ('/api/customer', () => {
    beforeEach (() => { server = require ('../../server') });
    afterEach (async () => { 
        await server.close(); 
        await Customer.deleteMany ({}); 
    });

    describe ('GET /', () => {
        it ('Should return all Customers', async () => {
            await Customer.collection.insertMany ([
                { name: 'Customer1', email: 'email1@gmail.com', password: '123', phone: '+923015842790' },
                { name: 'Customer2', email: 'email2@gmail.com', password: '456', phone: '+923015842791' }
            ]);

            const res = await request (server).get ('/api/customer');
            expect (res.status).toBe (200); 
            expect (res.body.length).toBe (2);
            expect (res.body.some (c => c.name === 'Customer1')).toBeTruthy();
            expect (res.body.some (c => c.name === 'Customer2')).toBeTruthy();
        });
    });

    describe ('GET /', () => {
        it ('Should return Customer by Given ID', async () => {
            const CUSTOMER = { _id: new mongoose.Types.ObjectId(), name: 'Ashar', email: 'email@gmail.com', password: '123', phone: '+923015842790', isAdmin: true };  
            const customer = new Customer (CUSTOMER);
            await customer.save();

            const res = await request (server).get ('/api/customer').send ({ user: { _id: CUSTOMER._id } });
            expect (res._id).toBe(CUSTOMER._id);
            expect (res._id).toBe(CUSTOMER._id);
        });
    });
});