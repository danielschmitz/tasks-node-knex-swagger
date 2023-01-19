var express = require('express')
const Joi = require('joi')
const db = require('../db')
const utils = require('../utils')
var router = express.Router()


const categorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
})

router.get('/categories', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Get all categories by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "A list of categories" }
    */
    const user_id = req.auth.id
    const categories = await db('categories').where({ user_id })
    return res.json(categories)
})

router.get('/categories/:id', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Get a category by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "A category" }
    */
    const user_id = req.auth.id
    const category = await db('categories').where({ id: req.params.id, user_id })
    if (!category) {
        return res.status(404).json({ message: 'Category not found' })
    }
    return res.json(category)
})

router.post('/categories', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Create a category by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[409] = { description: 'Category already exists' }
    #swagger.responses[403] = { description: 'Invalid Input' }
    #swagger.responses[201] = { description: "Category created" }
    #swagger.parameters['category'] = {
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

    const validateSchema = categorySchema.validate({name})
    if (validateSchema.error) {
        return res.status(403).json({ message: validateSchema.error.message })
    }

  
    // search category by name
    const existing_category = await db('categories').where({ name, user_id })
    if (existing_category.length > 0) {
        return res.status(409).json({ message: 'Category already exists' })
    }

    // create new category
    const category = await db('categories')
        .insert({ name, user_id })
        .returning(['id','name','user_id'])

    return res.json(category[0])
})

router.put('/categories/:id', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Update a category by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Category not found' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "Category updated" }
    #swagger.parameters['category'] = {
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

    const validateSchema = categorySchema.validate({name})
    if (validateSchema.error) {
        return res.status(403).json({ message: validateSchema.error.message })
    }

    const category_exists = await db('categories').where({ id, user_id })
    if (!category_exists) {
        return res.status(404).json({ message: 'Category not found' })
    }

    // update category
    const category = await db('categories')
        .where({ id, user_id })
        .update({ name })
        .returning(['id','name','user_id'])

    return res.json(category[0])
})

router.delete('/categories/:id', utils.checkLogin, async function (req, res, next) {
    /*
    #swagger.tags = ['Categories']
    #swagger.summary = '🔒️ Delete a category by logged user'
    #swagger.responses[401] = { description: 'Unauthorized' }
    #swagger.responses[404] = { description: 'Category not found' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[204] = { description: "Category deleted" }
    */
    const user_id = req.auth.id
    const id = req.params.id
    const category = await db('categories').where({ id, user_id })
    if (category.length === 0) {
        return res.status(404).json({ message: 'Category not found' })
    }
    await db('categories').where({ id, user_id }).delete()
    return res.json({ message: 'Category deleted' })
})

module.exports = router