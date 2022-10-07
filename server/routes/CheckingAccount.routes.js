const CheckingAccountController = require("../controller/CheckingAccount.controller")
const {authenticate} = require('../config/jwt.config')


const routes = (app) => {

    app.post('/api/checkingAccount', authenticate, CheckingAccountController.create)
    
    // get all
    app.get('/api/allAccounts', authenticate, CheckingAccountController.getAll)

    // get one
    app.get('/api/checkingAccount/:id', authenticate, CheckingAccountController.getOne)

    //Update
    app.put('/api/checkingAccount/:id', authenticate, CheckingAccountController.update)

    //Destroy
    app.delete('/api/checkingAccount/:id', authenticate, CheckingAccountController.delete)

}


module.exports = routes