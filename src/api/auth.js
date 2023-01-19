const express = require('express')
const router = express.Router()
require('dotenv').config()

const jwt = require("jsonwebtoken")
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const db = require("../db")
const utils = require('../utils')

const userSchema = Joi.object({
    password: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .required()
        .email()
})

router.post('/auth/login', async (req, res) => {
    /* 
    #swagger.tags = ['Auth']
    #swagger.summary = 'Try to login'
    #swagger.parameters['user'] = {
        in: 'body',
        description: 'User Login Data',
        required: true,
        schema: { 
            "email": "user1@email.com",
            "password": "123456"
        }
    } 
    #swagger.responses[500] = { description: 'Invalid input' }
    #swagger.responses[500] = { description: 'No user found with that email' }
    #swagger.responses[500] = { description: 'Incorrect password' }
    #swagger.responses[200] = { description: "Token" }
    */

    const { email, password } = req.body

    try {
        await userSchema.validateAsync({ email, password })
    } catch (error) {
        throw new Error("invalid data")
    }

    const user = await db("users").where({ email }).first()
    if (!user) {
        throw new Error("No user found with that email")
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        throw new Error("Incorrect password")
    }

    const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: '1y'
        }
    )

    res.status(200).json({ token })
})


router.get('/checkLogin', utils.checkLogin, async (req, res) => {
    /* 
    #swagger.tags = ['Auth']
    #swagger.summary = '🔒️ Check login and return token info'
    #swagger.responses[500] = { description: 'Unauthorized' }
    #swagger.responses[500] = { description: 'Authorization header is required' }
    #swagger.responses[200] = { description: "Token" }
    */
    return res.status(200).json({
        token: req.auth
    })
})


module.exports = router