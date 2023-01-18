const router = require('express').Router()

router.get('/hello-world', (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'A simple Hello World message' 
    */
    res.send("hello world")
})

router.get('/hello-world-with-error', (req, res) => {
    /* 
    #swagger.tags = ['Hello World with error']
    #swagger.summary = 'A simple Hello World message' 
    */
    throw new Error("Error at hello world")
    res.send("hello world")
})

module.exports = router