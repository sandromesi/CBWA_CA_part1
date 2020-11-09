const issues = require('../models/issues.js')();

module.exports = () => {
////////////////////// Get all issues with comments ////////////////////// 
    const getController = async (req, res) => {
        res.json(await issues.get());
    }

////////////////////// Get individual issues with comments ////////////////////// 
    const getByIssueNumber = async (req, res) => {
        res.json(await issues.get({ projectSlug: req.params.projectSlug, id: parseInt(req.params.id) }));
    }

////////////////////// Add new issues to a project individually ////////////////////// 
    const postController = async (req, res) => {
        const issueNumber = req.params.slug
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const project_id = req.body.project_id;
        const comment = req.body.comment;
        const result = await issues.add(issueNumber, title, description, status, project_id, comment);
        res.json(result);
    }

////////////////////// Get all issues for a project ////////////////////// 
    const populatedController = async (req, res) => {
        res.json(await issues.aggregateWithProject(req.params.projectSlug));
    }

    return {
        getController,
        postController,
        getByIssueNumber,
        populatedController,
    };
};