const Joi = require('joi')

const router = require('express').Router()

router.get('/hello-world', (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'A simple Hello World message' 
    */
    res.send('hello world')
})

router.get('/hello-world-with-error', (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'A simple Hello World message'
    #swagger.responses[500] = { description: 'hello world error' }
    */
    return res.status(500).send({message:'hello world error'})    
})

router.post('/hello-world-test-joi', async (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'Test joi validaton object'
    #swagger.responses[400] = { description: 'Data invalid' }
    #swagger.responses[200] = { description: 'Data valid' }
    #swagger.parameters['test'] = {
        in: 'body',
        description: 'Simple Data',
        required: true,
        schema: { 
            name: "Simple data"
        }
    } 
    */    
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(10)
            .required()
    })
    const validation = schema.validate(req.body)
    if (validation.error) {
        return res.status(400).send({"message": validation.error})
    }
    return res.send({"message": "ok"})
})

router.get('/hello-world-json', (req, res) => {
    /* 
    #swagger.tags = ['Hello World']
    #swagger.summary = 'hello world returning a json object'
    */
    res.send({
        message: 'hello world json'
    })
})


module.exports = router