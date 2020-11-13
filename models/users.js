const db = require("../db")();
const COLLECTION = "users";
const bcrypt = require('bcryptjs');

module.exports = () => {
    ////////////////////// Get user key ////////////////////// 
    const getByKey = async (key, email) => {
        try {
            if (!key || !email) {
                console.log(" ------------- 01: MISSING KEY OR EMAIL");
                return null;
            }
            // First get user by email
            const users = await db.get(COLLECTION, { email });
            // Then compare its hash key with the key stored in Bcrypt to allows access

            if (users.length !== 1) {
                console.log(" ------------- 02: BAD KEY OR EMAIL");
                return null;
            }

            const hash = await bcrypt.compare(key, users[0].key);

            return hash;
        } catch (ex) {
            console.log(" ------------- USERS GETBYKEY ERROR")
            return { error: "Oops, some error happened!" }
        }
    };

    ////////////////////// Get all users and individual users by email ////////////////////// 
    const get = async (email = null) => {
        console.log('   inside users model');
        if (!email) {
            try {
                const users = await db.get(COLLECTION);
                return { usersList: users };
            } catch (ex) {
                console.log(" ------------- USERS GET ERROR")
                return { error: "User doesn't exists!" }
            }
        }
        try {
            const users = await db.get(COLLECTION, { email });
            return { user: users };
        } catch (ex) {
            return { error: "User doesn't exists!" }
        }
    };

    ////////////////////// Add new users individually ////////////////////// 
    const add = async (name, email, key) => {

        if (!email || !name || !key) {
            return { error: "Email, name and key are required!" }
        }

        try {
            const results = await db.add(COLLECTION, {
                name: name,
                email: email,
                usertype: "user",
                key: key
            });

            console.log(results.result);
            return results.result;

        } catch (ex) {
            console.log(" ------------- USERS ADD ERROR")
            return { error: "Email already exists! Please, try a different email!" }
        }
    };

    return {
        getByKey,
        get,
        add,
    }
}