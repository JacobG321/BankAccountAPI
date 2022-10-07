

const mongoose = require('mongoose')

const checkingAccountSchema = new mongoose.Schema({
// transaction logic for deposit and payment
    owner:{
        type:String,
        required:[true,"Account holder is required."]
    },
    accountNumber:{
        type:Number,
        required:[true, "Account must have a number"]
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
}, {timestamps:true})

const CheckingAccount = mongoose.model('CheckingAccount', checkingAccountSchema)
module.exports = CheckingAccount