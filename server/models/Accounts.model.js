const mongoose = require('mongoose')

const accountsSchema = new mongoose.Schema({
    checking:{
        currentBalance:{
            type:Number}},
    savings:{
        currentBalance:{
            type:Number
        },
        interestRate:{
            type:Number
        }
    }
}, {timestamps:true})


const Accounts = mongoose.model('Accounts', accountsSchema)
module.exports = Accounts