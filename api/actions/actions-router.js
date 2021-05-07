// Write your "actions" router here!
const router = require('express').Router()
const Actions  = require('./actions-model')
const { validateActionId, validateAction } = require('../middleware')

router.get('/', async (req, res, next) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateAction, async (req, res, next) => {
    try {
        const newPost  = await Actions.insert(req._new)
        res.status(201).json(newPost)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateAction, validateActionId, async (req, res, next) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req._new)
        res.status(200).json(updatedAction)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(200).send('the requested resource was deleted')
    } catch(err) {
        next(err)
    }
})

//CATCHES ERRORS
router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        note: "something went wrong in the actions router",
        message: err.message,
        stack: err.stack
    })
})

module.exports = router