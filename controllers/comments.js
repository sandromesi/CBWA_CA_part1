const issues = require('../models/issues.js');

const comments = require('../models/comments.js')();

module.exports = () => {
    ////////////////////// Get all comments for an issue ////////////////////// 
    const getController = async (req, res) => {
        try {
            const { commentsList, error } = await comments.get({
                projectSlug: req.params.projectSlug,
                id: parseInt(req.params.id)
            });
            if (error) {
                return res.status(500).json({ error });
            }
            res.json({ commentsList: commentsList });
        } catch (ex) {
            console.log(" ------------- COMMENTS GETCONTROLLER ERROR")
            return { error: ex }
        }

    }

    ////////////////////// Get individual comments for an issue ////////////////////// 
    const getByID = async (req, res) => {
        try {
            const projectSlug = req.params.projectSlug;
            const id = parseInt(req.params.id);
            const commentId = parseInt(req.params.commentId);

            const comment = await comments.getById(projectSlug, id, commentId);

            res.json(comment);
        } catch (ex) {
            console.log(" ------------- COMMENTS GETBYID ERROR")
            return { error: ex }
        }
    }

    ////////////////////// Add new comments to an issue ////////////////////// 
    const postController = async (req, res) => {
        try {
            const issueNumber = {
                projectSlug: req.params.projectSlug,
                id: parseInt(req.params.id)
            }
            const text = req.body.text;
            const author = req.headers["x-api-email"];

            const { result, error } = await comments.add(issueNumber, text, author);
            if (error) {
                return res.status(500).json({ error });
            }

        } catch (ex) {
            res.status(201).send({
                message: "Comment registered successfully!"
            });
            console.log(" ------------- RESULT IS UNDEFINED, BUT IT'S FINE!")
            return { error: ex }
        }
    }

    return {
        getController,
        getByID,
        postController,
    };
};