const db = require('../db')();
const COLLECTION = "issues";
const ObjectID = require('mongodb').ObjectID;


module.exports = () => {
    ////////////////////// Get all comments for an issue ////////////////////// 
    const get = async (issueNumber) => {
        try {
            const issues = await db.get(COLLECTION, { issueNumber: issueNumber });
            return { commentsList: issues[0].comments };
        } catch (ex) {
            console.log(" ------------- COMMENTS GET ERROR")
            return { error: "Comments doesn't exist!" }
        }
    };

    ////////////////////// Get individual comments for an issue //////////////////////     
    const getById = async (projectSlug, id, commentId) => {
        try {
            if (!projectSlug) {
                return { error: "A valid project slug is required!" }
            }

            if (!projectSlug || !id || !commentId) {
                return { error: "Project slug, issue id and comment id are required!" }
            }
            const comment = await db.aggregate(COLLECTION, [
                { $match: { issueNumber: { projectSlug: projectSlug, id: id } } },
                {
                    $project: {
                        _id: 0,
                        title: 1,
                        issueNumber: 1,
                        description: 1,
                        status: 1,
                        project_id: 1,
                        comments: {
                            $filter: {
                                input: "$comments",
                                as: "comment",
                                cond: { $eq: ["$$comment.commentId", commentId] },
                            },
                        },
                    },
                }])

            console.log(comment)
            return comment;
        } catch (ex) {
            console.log(ex)
            console.log(" ------------- COMMENTS GETBYID ERROR")
            return { error: "Comment doesn't exist!" }
        }
    };

    ////////////////////// Add new comments to an issue ////////////////////// 
    const add = async (issueNumber, text, author) => {
        try {

            if (!text) {
                return { error: "Some text, is required!" }
            }

            const commentsCount = await db.aggregate(COLLECTION,
                [
                    { $match: { issueNumber: issueNumber } },
                    {
                        $project: {
                            _id: false,
                            item: 1,
                            commentsCount: {

                                $size: "$comments"
                            },
                        },
                    },
                ]);

            const comments = {
                _id: new ObjectID,
                commentId: commentsCount[0].commentsCount + 1,
                text: text,
                author: author
            };

            const results = await db.update(
                COLLECTION,
                { issueNumber: issueNumber },
                {
                    $push: { comments: comments },
                }
            );
            return results.result;
        } catch (ex) {
            console.log(" ------------- COMMENTS ADD ERROR")
            return {
                error: {
                    message: "Oops, some error happened!",
                    tip: "Check if the route is correct and create an issue first, if it doesn't exists!"
                }
            }
        }
    };

    return {
        get,
        getById,
        add,
    }
};