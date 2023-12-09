const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {}

userController.allUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.json(error)
    }
}

userController.register = async (req, res) => {
    try {
        const body = req.body
        delete body.role // will delete role when user tries to add role as admin // stong parameters
        const userObj = new User(body)
        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(userObj.password, salt)
        userObj.password = hashedPassword
        const user = await userObj.save()
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

userController.login = async (req, res) => {
    try {
        const body = req.body
        const user = await User.findOne({email: body.email})
        if(user) {
            const match = await bcryptjs.compare(body.password, user.password)
            if(match) {
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    role: user.role    
                }
                const token = jwt.sign(tokenData, 'dct@123')
                res.json(token)
            } else {
                res.json({
                    errors: 'invalid email or password'
                })
            }
        } else {
            res.json({
                errors: 'invalid email or password'
            })
        }
    } catch (error) {
        res.json(error)
    }
}

userController.roleUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const role = req.body.role
        body.role = role
        const user = await User.findByIdAndUpdate(id,body, {new: true, runValidators: true})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

module.exports = userController