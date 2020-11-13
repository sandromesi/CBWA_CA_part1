const projects = require('../models/projects.js')();

module.exports = () => {
    ////////////////////// Get all projects //////////////////////    
    const getController = async (req, res) => {
        try {
            const { projectsList, error } = await projects.get()
            if (error) {
                return res.status(500).json({ error });
            }
            res.json({ projects: projectsList });
        } catch (ex) {
            console.log(" ------------- PROJECTS GETCONTROLLER ERROR")
            return { error: ex }
        }

    };

    ////////////////////// Get individual projects //////////////////////    
    const getBySlug = async (req, res) => {
        try {
            const { project, error } = await projects.get(req.params.slug);
            if (error) {
                return res.status(500).json({ error });
            }
            res.json(project);
        } catch (ex) {
            console.log(" ------------- PROJECTS GETBYSLUG ERROR")
            return { error: ex }
        }

    }

    ////////////////////// Add new projects individually //////////////////////        
    const postController = async (req, res) => {
        try {
            const slug = req.body.slug;
            const name = req.body.name;
            const description = req.body.description;

            const { result, error } = await projects.add(slug, name, description);

            if (error) {
                return res.status(500).json({ error });
            }
            res.json("Project registered successfully!");

        } catch (ex) {
            console.log(" ------------- PROJECTS POSTCONTROLLER ERROR")
            return { error: ex }
        }
    }

    return {
        getController,
        postController,
        getBySlug,
    };
};