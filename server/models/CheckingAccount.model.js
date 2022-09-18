// put accounts over here
// checking, credit, savings

const mongoose = require('mongoose')

const checkingAccountSchema = new mongoose.Schema({
    accountNumber:{
        type:Number,
        required:[true, "Account must have a number"]
    },
    timestamps:{
        dateOpened:created_at,
        lastTransaction:updated_at
    },
    currentBalance:{
        type:Number
    }
})

const CheckingAccount = mongoose.model('CheckingAccount', checkingAccountSchema)
module.exports = CheckingAccount