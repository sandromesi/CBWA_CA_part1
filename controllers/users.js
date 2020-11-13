const users = require('../models/users.js')();
const bcrypt = require('bcryptjs');

module.exports = () => {
    ////////////////////// Get all users //////////////////////     
    const getController = async (req, res) => {
        try {
            const { usersList, error } = await users.get();
            if (error) {
                return res.status(500).json({ error });
            }
            res.json({ usersList: usersList });
        } catch (ex) {
            console.log(" ------------- USERS GETCONTROLLER ERROR")
            return { error: ex }
        }

    };

    ////////////////////// Get individual users by email //////////////////////        
    const getByEmail = async (req, res) => {
        try {
            const { user, error } = await users.get(req.params.email);
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(user);
        } catch (ex) {
            console.log(" ------------- USERS GETBYEMAIL ERROR")
            return { error: ex }
        }

    }

    ////////////////////// Add new users individually //////////////////////     
    const postController = async (req, res) => {
        try {
            const name = req.body.name;
            const email = req.body.email;
            const key = req.body.key;

            const hash = await bcrypt.hash(key, 10);
            const { result, error } = await users.add(name, email, hash);

            if (error) {
                return res.status(500).json({ error });
            }
            res.json("User registered successfully!");

        } catch (ex) {
            console.log(" ------------- USERS POSTCONTROLLER ERROR")
            return { error: ex }
        }

    }

    return {
        getController,
        postController,
        getByEmail,
    };
};