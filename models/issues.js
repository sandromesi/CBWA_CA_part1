const db = require('../db')();
const COLLECTION = "issues";

module.exports = () => {
    ////////////////////// Get all issues and individual issues with comments ////////////////////// 
    const get = async (issueNumber = null) => {
        console.log('   inside issues model');
        if (!issueNumber) {
            try {
                const issues = await db.get(COLLECTION);
                console.log(issues)
                return { issuesList: issues };
            } catch (ex) {
                console.log(" ------------- ISSUES GET ERROR")
                return { error: ex }
            }
        }
        try {
            const issues = await db.get(COLLECTION, { issueNumber });
            console.log(issues);
            return { issue: issues };
        } catch (ex) {
            return { error: ex }
        }
    };

    ////////////////////// Add new issues to a project individually ////////////////////// 
    const add = async (projectSlug, title, description) => {
        try {
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
            console.log(results.result);
            return results.result;

        } catch (ex) {
            console.log(" ------------- ISSUES ADD ERROR")
            return { error: ex }
        }
    };
    ////////////////////// Get all issues for a project ////////////////////// 
    const aggregateWithProject = async (projectSlug) => {

        try {
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
            console.log(issues);
            return issues;

        } catch (ex) {
            console.log(" ------------- ISSUES AGGREGATEWITHPROJECT ERROR")
            return { error: ex }
        }
    };

    return {
        get,
        add,
        aggregateWithProject,
    };
};