const users = require('../models/users.js')();

module.exports = () => {
////////////////////// Get all users //////////////////////     
    const getController = async (req, res) => {
        const { usersList, error } = await users.get()
        if (error) {
            return res.status(500).json({ error });
        }
        res.json({ users: usersList });
    };

////////////////////// Get individual users by email //////////////////////        
    const getByEmail = async (req, res) => {
        const { user, error } = await users.get(req.params.email);
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(user);

        //res.json(await users.get((req.params.email)));
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