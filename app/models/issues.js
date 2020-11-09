const db = require('../db')();
const COLLECTION = "issues";

module.exports = () => {
////////////////////// Get all issues and individual issues with comments ////////////////////// 
    const get = async (issueNumber = null) => {
        console.log('   inside issues model');
        if (!issueNumber) {
            const issues = await db.get(COLLECTION);
            return issues;
        }
        const issues = await db.get(COLLECTION, { issueNumber });
        return issues;
    };
////////////////////// Add new issues to a project individually ////////////////////// 
    const add = async (projectSlug, title, description) => {
        const issueCount = await db.count(COLLECTION);
        const project = await db.get("projects", { slug: projectSlug })

        const results = await db.add(COLLECTION, {
            issueNumber: { projectSlug: projectSlug, id: issueCount + 1 },
            title: title,
            description: description,
            status: "open",
            project_id: project[0]._id,
            comments: []
        });

        return results.result;
    };
////////////////////// Get all issues for a project ////////////////////// 
    const aggregateWithProject = async (projectSlug) => {
        const issues = await db.aggregate("projects", [
            {
                $match: { slug: projectSlug },
            },
            {
                $lookup: {
                    from: "issues",
                    localField: "_id",
                    foreignField: "project_id",
                    as: "issues",
                },
            },

        ]);
        return issues;
    };

    return {
        get,
        add,
        aggregateWithProject,
    };
};