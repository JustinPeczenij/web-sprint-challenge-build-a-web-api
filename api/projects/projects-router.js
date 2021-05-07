// Write your "projects" router here!
const router = require('express').Router()
const Projects = require('./projects-model')
const { validateProjectId, validateNewProject } = require('../middleware')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get()
        projects.length === 0 
        ? res.status(200).json([])
        : res.status(200).json(projects)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateProjectId,  (req, res) => {
    res.send(req.project)
})

router.post('/', validateNewProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert(req._new)
        res.status(201).json(newProject)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', 
    validateProjectId, 
    validateNewProject, 
    async (req, res, next) => {
        try {
            const updatedProject = await Projects.update(req.params.id, req._new)
            res.status(200).json(updatedProject)
        } catch(err) {
            next(err)
        }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.status(200).send('the requested resource was deleted')
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

//Error router
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        note: 'something went wrong in the projects router',
        message: err.message,
        stack: err.stack
    })
})

module.exports = router