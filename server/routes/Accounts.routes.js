const AccountsController = require("../controller/Accounts.controller")
const {authenticate} = require('../config/jwt.config')


const routes = (app) => {

    app.post('/api/createAccount', authenticate, AccountsController.create)
    
    // get all
    app.get('/api/allAccounts', AccountsController.getAll)

    // get one
    app.get('/api/accounts/:id', authenticate, AccountsController.getOne)

    //Update
    app.put('/api/accounts/:id', authenticate, AccountsController.update)

    //Destroy
    app.delete('/api/accounts/:id', authenticate, AccountsController.delete)

}


module.exports = routes