

const mongoose = require('mongoose')

const checkingAccountSchema = new mongoose.Schema({
// transaction logic for deposit and payment

    accountNumber:{
        type:Number,
        required:[true, "Account must have a number"]
    },
    timestamps:{
        dateOpened:created_at,
        transaction:updated_at
    },
    currentBalance:{
        type:Number
    },
    creditLimit:{
        type:Number
    },
    interestRate:{
        type:Number
    },
    transactions:[]
})

const CheckingAccount = mongoose.model('CheckingAccount', checkingAccountSchema)
module.exports = CheckingAccount