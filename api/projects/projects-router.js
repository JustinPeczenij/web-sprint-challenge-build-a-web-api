// Write your "projects" router here!
const router = require('express').Router()
const Projects = require('./projects-model')

router.get('/', (req, res) => {
    console.log('working')
    res.send('pow')
})

module.exports = router