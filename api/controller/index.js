const express = require('express')
const bodyParser = require('body-parser')
const routes = express.Router()
const {verifyAToken} = require('../middleware/Authentication')
// Import all model's objects
const {users, products} = require('../model')

// ===User's router ====
routes.get('/users', (req, res) => {
    users.fetchUsers(req, res)
})

routes.get('/user/:id', (req, res) => {
    users.fetchUser(req, res)
})
// register
routes.post('/register', bodyParser.json(), (req, res) => {
    users.register(req, res)
})

// login
routes.post('/login', bodyParser.json(), (req, res) => {
    users.login(req, res)
})
/*
routes.put('/user/:id', bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
})
*/

routes.patch('/user/:id', bodyParser.json(), (req, res) => {
    users.updateUser(req, res)
})

routes.delete('/user/:id', (req, res) => {
    users.deleteUser(req, res)
})

// products router
// retrieve all products
routes.get('/products', verifyAToken, (req, res) =>{
    products.fetchProducts(req, res)
})

//retrieving a single product
routes.get('/product/:id', verifyAToken, (req, res) =>{
    products.fetchProduct(req, res)
})
// adding a new product
routes.post('/addproduct', bodyParser.json(), (req, res) =>{
    products.addProduct(req, res)
})

// updating a product by id
routes.patch('/product/:id', bodyParser.json(), (req, res) => {
    products.updateProduct(req, res)
})

// deleting a product by id
routes.delete('/product/:id', bodyParser.json(), (req, res) => {
    products.deleteProduct(req, res)
})

module.exports = {
    express,
    routes,
    verifyAToken
}