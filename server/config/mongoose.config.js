const mongoose = require('mongoose')


mongoose
    .connect("mongodb://127.0.0.1/BankAccountAPI")
    .then(() =>{
        console.log("connected to MongoDB")
    })
    .catch((err) => {
        console.log("error connecting to mongoDB", err.message)
    })