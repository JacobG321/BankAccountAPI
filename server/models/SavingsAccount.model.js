const mongoose = require('mongoose')

// interest payout will need changing

const savingsAccountSchema = new mongoose.Schema({
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
    interestRate:{
        type:Number
    },
    interestPayout:{
        type:String
    },
    transactions:[]
})

const SavingsAccount = mongoose.model('SavingsAccount', savingsAccountSchema)
module.exports = SavingsAccount