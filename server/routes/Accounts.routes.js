const AccountsController = require("../controller/Accounts.controller")
const {authenticate} = require('../config/jwt.config')


const routes = (app) => {

    app.post('/api/createAccount', authenticate, AccountsController.create)
    
    // get all
    app.get('/api/allAccounts', AccountsController.getAll)

    // get one
    app.get('/api/accounts/:id', authenticate, AccountsController.getOne)

    // get one test
    app.get('/test/accounts/:id', AccountsController.getOne)
    
    // transfer
    app.put('/api/accounts/transfer', AccountsController.transfer)

    //Update
    app.put('/api/accounts/:id', AccountsController.update)


    //Destroy
    app.delete('/api/accounts/:id', authenticate, AccountsController.delete)

}


module.exports = routes