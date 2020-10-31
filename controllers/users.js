const users = require('../models/users.js')();

module.exports = () => {
////////////////////// Get all users //////////////////////     
    const getController = async (req, res) => {
        res.json(await users.get());
    }

////////////////////// Get individual users by email //////////////////////        
    const getByEmail = async (req, res) => {
        res.json(await users.get((req.params.email)));
    }

////////////////////// Add new users individually //////////////////////     
    const postController = async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const key = req.body.key;
        const result = await users.add(name, email, key);
        res.json(result);
    }

    return {
        getController,
        postController,
        getByEmail,
    };
};