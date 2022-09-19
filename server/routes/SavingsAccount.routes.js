const SavingsAccountController = require("../controller/SavingsAccount.controller")

const routes = (app) => {

    app.post('/api/savingsAccount', SavingsAccountController.create)
    
    // get all
    app.get('/api/savingsAccounts', SavingsAccountController.getAll)

    // get one
    app.get('/api/savingsAccount/:id', SavingsAccountController.getOne)

    //Update
    app.put('/api/savingsAccount/:id', SavingsAccountController.update)

    //Destroy
    app.delete('/api/savingsAccount/:id', SavingsAccountController.delete)

}


module.exports = routes