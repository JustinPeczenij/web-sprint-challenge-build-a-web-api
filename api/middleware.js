const Projects = require('./projects/projects-model')

const validateProjectId = async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id)
        if(!project) {
         next({ status: 404, message: `project with id ${req.params.id} was not found`})
        } else{
            req.project = project
            next()
        }
    } catch(err) {
        next(err)
    }
}

const validateNewProject = async (req, res, next) => {
    const newProject = req.body
    if(!newProject.name || !newProject.description) {
        next({ status: 400, message: 'request is missing a project name or description'})
    } else {
        req._new = newProject
        next()
    }
}

module.exports = {
    validateProjectId,
    validateNewProject
}