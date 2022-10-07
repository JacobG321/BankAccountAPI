const CustomerController = require("../controller/customer.controller")
const { authenticate,isLoggedIn } = require('../config/jwt.config')


const routes = (app) => {

    // create account
    app.post('/api/customer', CustomerController.register)
    // login
    app.get('/api/login', CustomerController.login)

    //get all
    app.get('/api/customers', CustomerController.getAll)

    //Update
    app.put('/api/customer/:id', CustomerController.update)

    //Destroy
    app.delete('/api/customer/:id',CustomerController.logout)
    // login checker
    app.post('/api/isLoggedIn',isLoggedIn)

}


module.exports = routes