const issues = require('../models/issues.js')();

module.exports = () => {
    ////////////////////// Get all issues with comments ////////////////////// 
    const getController = async (req, res) => {
        const { issuesList, error } = await issues.get()
        if (error) {
            return res.status(500).json({ error });
        }
        res.json({ issues: issuesList });
    }

    ////////////////////// Get individual issues with comments ////////////////////// 
    const getByIssueNumber = async (req, res) => {
        const { issue, error } = await issues.get({
            projectSlug: req.params.projectSlug,
            id: parseInt(req.params.id)
        });
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(issue);
    }

    ////////////////////// Add new issues to a project individually ////////////////////// 
    const postController = async (req, res) => {
        const issueNumber = req.params.slug
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const project_id = req.body.project_id;
        const comment = req.body.comment;

        const { result, error } = await issues.add(issueNumber, title, description, status, project_id, comment);
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(result);
    }

    ////////////////////// Get all issues for a project ////////////////////// 
    const populatedController = async (req, res) => {
        const { issue, error } = await issues.aggregateWithProject(req.params.projectSlug);
        if (error) {
         return res.status(500).json({ error });
         }
        res.json(issue);

        //res.json(await issues.aggregateWithProject(req.params.projectSlug));
    }

    return {
        getController,
        postController,
        getByIssueNumber,
        populatedController,
    };
};