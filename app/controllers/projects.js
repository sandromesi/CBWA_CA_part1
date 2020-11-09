const projects = require('../models/projects.js')();

module.exports = () => {
////////////////////// Get all projects //////////////////////    
    const getController = async (req, res) => {
        res.json(await projects.get());
    }

////////////////////// Get individual projects //////////////////////    
    const getBySlug = async (req, res) => {
        res.json(await projects.get((req.params.slug)));
    }

////////////////////// Add new projects individually //////////////////////        
    const postController = async (req, res) => {
        const slug = req.body.slug;
        const name = req.body.name;
        const description = req.body.description;
        const result = await projects.add(slug, name, description);
        res.json(result);
    }

    return {
        getController,
        postController,
        getBySlug,    
    };
};