const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
    ////////////////////// Get user key //////////////////////    
    const getByKey = async (key) => {
        try {
            if (!key) {
                console.log("   01: Missing key");
                return null;
            }
            const users = await db.get(COLLECTION, { key });
            if (users.length !== 1) {
                console.log("   02: Bad key");
                return null;
            }
            return users[0];
        } catch (ex) {
            console.log(" ------------- USERS GETBYKEY ERROR")
            return { error: ex }
        }
    };
    ////////////////////// Get all users and individual users by email ////////////////////// 
    const get = async (email = null) => {
        console.log('   inside users model');
        if (!email) {
            try {
                const users = await db.get(COLLECTION);
                console.log(users)
                return { usersList: users };
            } catch (ex) {
                console.log(" ------------- USERS GET ERROR")
                return { error: ex }
            }
        }
        try {
            const users = await db.get(COLLECTION, { email });
            console.log(users);
            return { user: users };
        } catch (ex) {
            return { error: ex }
        }
    };

    ////////////////////// Add new users individually ////////////////////// 
    const add = async (name, email, key) => {
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
            return { error: ex }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////    

    return {
        getByKey,
        get,
        add,
    }
}