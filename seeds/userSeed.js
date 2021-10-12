// IMPORTS ------------------------------------------
import mongoose from 'mongoose';
import '../db-connect.js'
import User from '../models/User.js';
import faker from 'faker';
// --------------------------------------------------

let usersCreated= [];

(async function() {
    
    try {
        await User.deleteMany( {} );
        console.log("All users have been deleted from the database");
    } catch (error) {
        console.log(error.message);
    };

    const userPromises = Array(5)
        .fill(null)
        .map(() => {
            const userData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName()
            };
            
            console.log(`User ${userData.username} with email ${userData.email} and password ${userData.password} has been created`);

            const user = new User( userData );
            return user.save();
        });

        try {
            usersCreated = await Promise.all( userPromises );
        } catch (error) {
            console.log(error.message);
        };

        mongoose.connection.close();
})();