const Projects = require('./projects/projects-model')
const Actions = require('./actions/actions-model')


//PROJECT VALIDATION
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

const validateNewProject = (req, res, next) => {
    const newProject = req.body
    if(!newProject.name || !newProject.description) {
        next({ status: 400, message: 'request is missing a project name or description'})
    } else {
        req._new = newProject
        next()
    }
}

//ACTION VALIDATION
const validateActionId = async (req, res, next) => {
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            next({ status: 404, message: `action with id ${req.params.id} was not found`})
        } else{
            req.action = action
            next()
        }
    } catch(err) {
        next(err)
    }
}

const validateAction = async (req, res, next) => {
    try{
        const newAction = req.body 
        const project = await Projects.get(newAction.project_id || req.params.id)
        const allProjects = await Projects.get()
        if(!newAction.description || !newAction.notes || !newAction.project_id) {
            next({ status: 400, message: 'request is missing an action description, notes, or project_id'})
        } else if(!project) {
            next({ status: 404, message: `action needs to match an existing project's id (available id's: ${allProjects.map(p => p.id)})` })
        } else {
            req._new = newAction
            next()
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {
    validateProjectId,
    validateNewProject,
    validateActionId, 
    validateAction
}