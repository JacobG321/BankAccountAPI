const CheckingAccountController = require("../controller/CheckingAccount.controller")

const routes = (app) => {

    app.post('/api/checkingAccount', CheckingAccountController.create)
    
    // get all
    app.get('/api/checkingAccounts', CheckingAccountController.getAll)

    // get one
    app.get('/api/checkingAccount/:id', CheckingAccountController.getOne)

    //Update
    app.put('/api/checkingAccount/:id', CheckingAccountController.update)

    //Destroy
    app.delete('/api/checkingAccount/:id', CheckingAccountController.delete)

}


module.exports = routes