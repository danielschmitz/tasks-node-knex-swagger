const router = require('express').Router()

router.get('/hello-world', (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'A simple Hello World message' 
    */
    res.send("hello world")
})

module.exports = router