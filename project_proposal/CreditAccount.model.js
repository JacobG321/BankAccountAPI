const mongoose = require('mongoose')

// interest payout will need changing

const creditAccountSchema = new mongoose.Schema({
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

const CreditAccount = mongoose.model('CreditAccount', creditAccountSchema)
module.exports = CreditAccount