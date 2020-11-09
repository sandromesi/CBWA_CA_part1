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
                console.log(" ------------- PROJECTS GET ERROR")
                return { error: ex }
            }
        }
        try {
            const projects = await db.get(COLLECTION, { slug });
            console.log(projects);
            return { project: projects };
        } catch (ex) {
            return { error: ex }
        }
    };

    ////////////////////// Add new projects individually //////////////////////    
    const add = async (slug, name, description) => {
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
            return { error: ex }
        }
    }

    return {
        get,
        add,
    }
};