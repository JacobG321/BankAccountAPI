const CustomerController = require("../controller/customer.controller")

const routes = (app) => {

    app.post('/api/customer', CustomerController.create)
    
    // get all
    app.get('/api/customers', CustomerController.getAll)

    // get one
    app.get('/api/customer/:id', CustomerController.getOne)

    //Update
    app.put('/api/customer/:id', CustomerController.update)

    //Destroy
    app.delete('/api/customer/:id',CustomerController.delete)

}


module.exports = routes