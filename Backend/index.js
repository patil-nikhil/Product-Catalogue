const express = require('express')
const app = express()
const cors = require('cors')
const configDB = require('./config/database')
const userController = require('./app/controllers/userController')
const productController = require('./app/controllers/productController')
const authenticateUser = require('./app/middlewares/authenticate')
const authorizeUser = require('./app/middlewares/authorize')
const port = 3210

configDB()

app.use(express.json())
app.use(cors())

// users
app.post('/api/users/register', userController.register)
app.post('/api/users/login', userController.login)
app.get('/api/users',authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'moderator']
    next()
}, authorizeUser, userController.allUsers)
app.put('/api/users/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'moderator']
    next()
}, authorizeUser, userController.roleUpdate)

// products
app.get('/api/products', authenticateUser, productController.list)

app.post('/api/products', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'moderator']
    next()
}, authorizeUser, productController.create)

app.put('/api/products/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'moderator']
    next()
}, authorizeUser, productController.update)

app.get('/api/products/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'moderator']
    next()
}, authorizeUser, productController.show)

app.delete('/api/products/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, productController.destroy)

app.listen(port, () => {
    console.log('Server running on port', port)
})