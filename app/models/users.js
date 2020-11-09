const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
////////////////////// Get user key //////////////////////    
    const getByKey = async (key) => {
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
    };
////////////////////// Get all users and individual users by email ////////////////////// 
    const get = async (email = null) => {
        console.log('   inside users model');
        if (!email) {
            const users = await db.get(COLLECTION);
            return users;
        }

        const users = await db.get(COLLECTION, { email });
        return users;
    };
////////////////////// Add new users individually ////////////////////// 
    const add = async (name, email, key) => {
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: "user",
            key: key
        });
        return results.result;
    };

    return {
        getByKey,
        get,
        add,
    }
}