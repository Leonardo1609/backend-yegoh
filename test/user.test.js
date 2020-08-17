const mongoose = require('mongoose');
const app = require('../src/server');
const supertest = require('supertest');
const request = supertest( app );
// const db_test = 'mongodb://mongo:27017/test_db';
const db_test = 'mongodb://localhost:27017/test_db';

const user_insert = {
    names: "Leonardo",
    lastnames: "Cornejo",
    email: "leonardo@gmail.com",
    password: "123123",
    state: "1"
}

const user_insert2 = {
    names: "Giovanni",
    lastnames: "Mora",
    email: "giovanni@gmail.com",
    password: "123123",
    state: "1"
}

const user_modify = {
    names: "Leonard",
    lastnames: "Cornejo",
    email: "leonardo123@gmail.com",
    password: "123123",
    state: "1"
}


const User = require('../src/model/User');

describe('Tests in user', () => {
    beforeAll( async () => {
        await mongoose.connect( db_test, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        } );
    })

    afterEach( async () => {
        await User.deleteMany();
    });

    afterAll( async () => {
        await mongoose.connection.close();
    });

    it("Should have to save user in db", async done => {
        
        const res = await request.post('/api/users').send( user_insert );
        
        const user = await User.findOne({ email: res.body.user.email });

        expect( user ).toBeTruthy();
        done();
    });

    it( "Should have to modify user in db", async done => {
        // First, I insert a user
        const res = await request.post('/api/users').send( user_insert );

        // Then, I modify the previous user
        const user_updated = await request.post(`/api/users/modify/${ res.body.user._id }`).send( user_modify );
        
        const user = await User.findOne({ 
            names: user_updated.body.names, 
            email: user_updated.body.email 
        });

        expect( user ).toBeTruthy();

        done(); 
    });

    it('Sloud return all users I insert in the db', async () => {
        await request.post('/api/users').send( user_insert );
        await request.post('/api/users').send( user_insert2 );

        const res = await request.get('/api/users');
        
        expect( JSON.parse( res.text ).users ).toHaveLength( 2 );

    });
});