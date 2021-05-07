// Write your "actions" router here!
const router = require('express').Router()
// const Actions  = require('./actions-model')

router.get('/', (req, res) => {
    console.log('test')
    res.send('oranges')
})

module.exports = router