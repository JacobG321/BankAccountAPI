const CustomerController = require("../controller/customer.controller")
const {isLoggedIn } = require('../config/jwt.config')


const routes = (app) => {

    // create account
    app.post('/api/customer', CustomerController.register)
    // login
    app.post('/api/login', CustomerController.login)

    //get all
    app.get('/api/customers', CustomerController.getAll)

    //Update
    app.put('/api/customer/:id', CustomerController.update)

    //Destroy
    app.delete('/api/customer/:id',CustomerController.logout)
    // login checker
    app.post('/api/isLoggedIn', isLoggedIn)

    // use effect and axios post route to protect routes, {}, {withCredentials:true} to ensure login, use a catch to send em back.

}


module.exports = routes