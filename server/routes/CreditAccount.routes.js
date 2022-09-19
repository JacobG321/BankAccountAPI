const CreditAccountController = require("../controller/CreditAccount.controller")

const routes = (app) => {

    app.post('/api/creditAccount', CreditAccountController.create)
    
    // get all
    app.get('/api/creditAccounts', CreditAccountController.getAll)

    // get one
    app.get('/api/creditAccount/:id', CreditAccountController.getOne)

    //Update
    app.put('/api/creditAccount/:id', CreditAccountController.update)

    //Destroy
    app.delete('/api/creditAccount/:id', CreditAccountController.delete)

}


module.exports = routes