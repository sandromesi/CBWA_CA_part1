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
                return { error: ex }
            }
        }
        try {
            const projects = await db.get(COLLECTION, { slug });
            console.log(projects);
            return { project: projects };
        } catch (ex) {
            console.log(" ------------- GET INDIVIDUAL PROJECTS ERROR")
            return { error: ex }
        }
    };

    ////////////////////// Add new projects individually //////////////////////   
    const add = async (slug, name, description) => {
        if (!slug || !name || !description) {
            return { Error: "slug, name and description are required!" }
        }

        if (slug.length !== 1 || name.length !== 1 || description.length !== 1) {
            return { Error: "slug, name and description should have at least 3 characters!" }
        }

        try {
            AddProjectsValidation;
            const results = await db.add(COLLECTION, {
                slug: slug,
                name: name,
                description: description
            });

            console.log(results.result);
            return results.result;
        } catch (ex) {
            console.log(" ------------- THIS SLUG ALREADY EXISTS");
            return { Error: "This slug already exists! Try a different slug!" }
        }

    };

    return {
        get,
        add,
    }
};