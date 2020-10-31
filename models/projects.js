const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {

////////////////////// Get all projects and individual projects //////////////////////
    const get = async (slug = null) => {
        console.log('   inside projects model');
        if (!slug){
            const projects = await db.get(COLLECTION);
            return projects;
        }
        const projects = await db.get(COLLECTION, { slug });
        return projects;
    };

////////////////////// Add new projects individually //////////////////////    
    const add = async (slug, name, description) => {
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            description: description
        });
        return results.result;
    }
    
    return {
        get,
        add,
    }
};