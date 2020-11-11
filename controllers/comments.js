const issues = require('../models/issues.js');

const comments = require('../models/comments.js')();

module.exports = () => {
    ////////////////////// Get all comments for an issue ////////////////////// 
    const getController = async (req, res) => {
        const { commentsList, error } = await comments.get({
            projectSlug: req.params.projectSlug,
            id: parseInt(req.params.id)
        });
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(commentsList);
    }

    ////////////////////// Get individual comments for an issue ////////////////////// 
    const getByID = async (req, res) => {
        const projectSlug = req.params.projectSlug;
        const id = parseInt(req.params.id);
        const commentId = parseInt(req.params.commentId);

        const { comment, error } = await comments.getById(projectSlug, id, commentId);
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(comment);

        //const projectSlug = req.params.projectSlug;
        //const id = parseInt(req.params.id);
        //const commentId = parseInt(req.params.commentId);
        // res.json(await comments.getById(projectSlug, id, commentId));
    }

    ////////////////////// Add new comments to an issue ////////////////////// 
    const postController = async (req, res) => {
        const issueNumber = {
            projectSlug: req.params.projectSlug,
            id: parseInt(req.params.id)
        }
        const text = req.body.text;
        const author = req.body.author;

        const { result, error } = await comments.add(issueNumber, text, author);
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(result);
    }

    return {
        getController,
        getByID,
        postController,
    };
};