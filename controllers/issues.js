const issues = require('../models/issues.js')();

module.exports = () => {
    ////////////////////// Get all issues with comments ////////////////////// 
    const getController = async (req, res) => {
        try {
            const { issuesList, error } = await issues.get()
            if (error) {
                return res.status(500).json({ error });
            }
            res.json({ issues: issuesList });

        } catch (ex) {
            console.log(" ------------- ISSUES GETCONTROLLER ERROR")
            return { error: ex }
        }

    }

    ////////////////////// Get individual issues with comments ////////////////////// 
    const getByIssueNumber = async (req, res) => {
        try {
            const { issue, error } = await issues.get({
                projectSlug: req.params.projectSlug,
                id: parseInt(req.params.id)
            });
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(issue);

        } catch (ex) {
            console.log(" ------------- ISSUES GETBYISSUENUMBER ERROR")
            return { error: ex }
        }
    }

    ////////////////////// Add new issues to a project individually ////////////////////// 
    const postController = async (req, res) => {
        try {
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
            res.json("Issue registered successfully!");

        } catch (ex) {
            console.log(" ------------- ISSUES POSTCONTROLLER ERROR")
            return { error: ex }
        }
    }


    ////////////////////// Get all issues for a project ////////////////////// 
    const populatedController = async (req, res) => {
        try {
            const issue = await issues.aggregateWithProject(req.params.projectSlug);

            res.json({issues: issue});
        } catch (ex) {
            console.log(" ------------- ISSUES POPULATEDCONTROLLER ERROR")
            return { error: ex }
        }
    }

    return {
        getController,
        postController,
        getByIssueNumber,
        populatedController,
    };
};