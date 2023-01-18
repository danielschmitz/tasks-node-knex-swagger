const Joi = require('joi')

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

router.post('/hello-world-test-joi', async (req, res) => {
    /* 
    #swagger.tags = ['Test joi validation ']
    #swagger.summary = 'Test joi validaton object'
    #swagger.parameters['test'] = {
        in: 'body',
        description: 'Simple Data',
        required: true,
        schema: { $ref: "#/definitions/SimpleData" }
    } 
    */    
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(10)
            .required()
    })
    try {
        await schema.validateAsync(req.body)
    } catch (error) {
        throw new Error(error.message)
    }
    res.send("ok")
})




module.exports = router