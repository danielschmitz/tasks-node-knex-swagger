var express = require('express')
const Joi = require('joi')
const db = require('../db')
const utils = require('../utils')
var router = express.Router()


const taskSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string()
        .min(3)
        .max(1000),
    user_id: Joi.number(),
    category_id: Joi.number(),
})

router.get('/tasks', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Tasks']
    #swagger.summary = '🔒️ Get undone tasks by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "A list of tasks" }
    */
    const user_id = req.auth.id
    const done = false
    const tasks = await db('tasks').where({ user_id, done })
    return res.json(tasks)
})

router.get('/tasks/all', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Tasks']
    #swagger.summary = '🔒️ Get all tasks by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "A list of tasks" }
    */
    const user_id = req.auth.id
    const tasks = await db('tasks').where({ user_id })
    return res.json(tasks)
})

router.get('/tasks/:id', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Tasks']
    #swagger.summary = '🔒️ Get a task by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "A task" }
    */
    const user_id = req.auth.id
    const task = await db('tasks').where({ id: req.params.id, user_id })
    if (!task) {
        return res.status(404).json({ message: 'Category not found' })
    }
    return res.json(task)
})

router.post('/tasks', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Tasks']
    #swagger.summary = '🔒️ Create a task by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[409] = { description: 'Category already exists' }
    #swagger.responses[403] = { description: 'Invalid Input' }
    #swagger.responses[201] = { description: "Category created" }
    #swagger.parameters['task'] = {
        in: 'body',
        description: 'Category Data',
        required: true,
        schema: { 
            "name": "Category name"            
        }
    } 
    */
    const user_id = req.auth.id
    const name = req.body.name

    const validateSchema = taskSchema.validate({name})
    if (validateSchema.error) {
        return res.status(403).json({ message: validateSchema.error.message })
    }

  
    // search task by name
    const existing_task = await db('tasks').where({ name, user_id })
    if (existing_task.length > 0) {
        return res.status(409).json({ message: 'Category already exists' })
    }

    // create new task
    const task = await db('tasks')
        .insert({ name, user_id })
        .returning(['id','name','user_id'])

    return res.json(task[0])
})

router.put('/tasks/:id', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Tasks']
    #swagger.summary = '🔒️ Update a task by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Category not found' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "Category updated" }
    #swagger.parameters['task'] = {
        in: 'body',
        description: 'Category Data',
        required: true,
        schema: { 
            "name": "Category name"            
        }
    } 
    */
    const user_id = req.auth.id
    const name = req.body.name
    const id = req.params.id

    const validateSchema = taskSchema.validate({name})
    if (validateSchema.error) {
        return res.status(403).json({ message: validateSchema.error.message })
    }

    const task_exists = await db('tasks').where({ id, user_id })
    if (!task_exists) {
        return res.status(404).json({ message: 'Category not found' })
    }

    // update task
    const task = await db('tasks')
        .where({ id, user_id })
        .update({ name })
        .returning(['id','name','user_id'])

    return res.json(task[0])
})

router.delete('/tasks/:id', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Tasks']
    #swagger.summary = '🔒️ Delete a task by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Category not found' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[204] = { description: "Category deleted" }
    */
    const user_id = req.auth.id
    const id = req.params.id
    const task = await db('tasks').where({ id, user_id })
    if (task.length === 0) {
        return res.status(404).json({ message: 'Category not found' })
    }
    await db('tasks').where({ id, user_id }).delete()
    return res.json({ message: 'Category deleted' })
})

module.exports = router