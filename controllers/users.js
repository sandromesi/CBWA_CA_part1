const users = require('../models/users.js')();
const bcrypt = require('bcryptjs');
const emailService = require('../services/email-service')
const authService = require('../services/auth-service');

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

            emailService.send(req.body.email, req.body.name)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.log(error)
                })

            const { result, error } = await users.add(name, email, hash);

            if (error) {
                return res.status(500).json({ error });
            }
            res.status(201).send({
                message: "User registered successfully!"
            });

        } catch (ex) {
            console.log(" ------------- USERS POSTCONTROLLER ERROR")
            return { error: ex }
        }
    }

    ////////////////////// Authenticate user //////////////////////    
    const authController = async (req, res) => {
        try {
            const { user, error } = await users.authenticate(req.body.email);
            if (error) {
                return res.status(500).json({ error });
            }

            const token = await authService.generateToken({
                id: user[0]._id,
                name: user[0].name,
                email: user[0].email,
            });

            res.status(201).send({
                token: token,
                data: {
                    email: user[0].email,
                    name: user[0].name
                },
            })
        } catch (ex) {
            console.log(" ------------- USERS AUTHCONTROLLER ERROR")
            return { error: ex }
        }
    }

    ////////////////////// Authenticated post test //////////////////////   
    const authPostController = async (req, res) => {
        try {
            // Retrieves token
            const token = req.body.token || req.query.body || req.headers['x-access-token'];
            // Decodes token
            const data = await authService.decodeToken(token);

            const name = req.body.name;
            const email = req.body.email;
            const key = req.body.key;

            const hash = await bcrypt.hash(key, 10);

            const { result, error } = await users.add(name, email, hash);

            if (error) {
                return res.status(500).json({ error });
            }
            res.status(201).send({
                message: "User registered successfully!"
            });

        } catch (ex) {
            console.log(" ------------- USERS POSTCONTROLLER ERROR")
            return { error: ex }
        }
    }

    ////////////////////// Authenticate user //////////////////////    
    const refreshController = async (req, res) => {
        try {
            // Retrieves token
            const token = req.body.token || req.query.body || req.headers['x-access-token'];
            // Decodes token
            const data = await authService.decodeToken(token);
            console.log(data)
            console.log(data.email)
            const { user, error } = await users.get(data.email);
            console.log(user)
            if (error) {
                return res.status(500).json({ error });
            }

            const tokenData = await authService.generateToken({
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
            });

            res.status(201).send({
                newToken: tokenData,
                data: {
                    email: user[0].email,
                    name: user[0].name
                },
            })
        } catch (ex) {
            console.log(ex)
            console.log(" ------------- USERS REFRESHCONTROLLER ERROR")
            return { error: ex }
        }
    }



    return {
        getController,
        postController,
        getByEmail,
        authController,
        authPostController,
        refreshController,
    };
};