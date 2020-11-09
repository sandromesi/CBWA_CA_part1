const projects = require('../models/projects.js')();

module.exports = () => {
    ////////////////////// Get all projects //////////////////////    
    const getController = async (req, res) => {
        const { projectsList, error } = await projects.get()
        if (error) {
            return res.status(500).json({ error });
        }
        res.json({ projects: projectsList });
    };

    ////////////////////// Get individual projects //////////////////////    
    const getBySlug = async (req, res) => {
        const { project, error } = await projects.get(req.params.slug);
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(project);
    }

    ////////////////////// Add new projects individually //////////////////////        
    const postController = async (req, res) => {
        const slug = req.body.slug;
        const name = req.body.name;
        const description = req.body.description;

        const {result, error} = await projects.add(slug, name, description);
        if(error){
            return res.status(500).json({ error });
        }
        res.json(result);
    }

    return {
        getController,
        postController,
        getBySlug,
    };
};