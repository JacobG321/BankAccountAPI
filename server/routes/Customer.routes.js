const CustomerController = require("../controller/customer.controller")
const {isLoggedIn, authenticate } = require('../config/jwt.config')


const routes = (app) => {

    // create account
    app.post('/api/customer', CustomerController.register)

    // login
    app.post('/api/login', CustomerController.login)

    // login checker
    app.get('/api/auth', isLoggedIn)

    // logout
    app.get('/api/logout',CustomerController.logout)

    //Update
    app.put('/api/customer/:id', CustomerController.update)

    //get all
    app.get('/api/customers', CustomerController.getAll)

}


module.exports = routes