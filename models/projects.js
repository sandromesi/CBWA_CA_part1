const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {

    ////////////////////// Get all projects and individual projects //////////////////////
    const get = async (slug = null) => {
        console.log('   inside projects model');
        if (!slug) {
            try {
                const projects = await db.get(COLLECTION);

                console.log(projects)
                return { projectsList: projects };
            } catch (ex) {
                console.log(" ------------- GET PROJECTS ERROR")
                return { error: "Project doesn't exists!" }
            }
        }
        try {
            const projects = await db.get(COLLECTION, { slug });
            console.log(projects);
            return { project: projects };
        } catch (ex) {
            console.log(" ------------- GET INDIVIDUAL PROJECTS ERROR")
            return { error: "Project doesn't exists!" }
        }
    };

    const add = async (slug, name, description) => {

        if (!name || !slug || !description) {
            return { error: "Slug, name and description are required!" }
        }

        try {
            const results = await db.add(COLLECTION, {
                slug: slug,
                name: name,
                description: description
            });

            console.log(results.result);
            return results.result;

        } catch (ex) {
            console.log(" ------------- PROJECTS ADD ERROR")
            return { error: "Slug already exists! Please, try a different slug!" }
        }
    };

    return {
        get,
        add,
    };
};

