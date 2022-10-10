const Accounts = require("../models/Accounts.model")
const Customer = require("../models/Customer.model")
const jwt = require("jsonwebtoken");

const AccountsController = {
    // Create
    create:async (req,res) =>{
        let newAccount = null
        const decodedCookie = jwt.decode(req.cookies.customertoken, {complete:true})
        await Accounts.create(req.body)
        .then((account)=>{
            newAccount = account
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
        
        Customer.findOneAndUpdate({_id:decodedCookie.payload.id}, {$push:{accounts:newAccount._id}})
        .then((customer)=>{
            res.status(201).json({accounts:newAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    getAll:(req,res) =>{
        Accounts.find({})
        .then((accounts)=>{
            res.status(200).json({accounts:accounts})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error", error:err})
        })
    },
    getOne:(req,res)=>{
        Accounts.find({_id:req.params.id})
        .then((accounts)=>{
            res.status(200).json({accounts:accounts})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    },

    update:(req,res)=>{
        Accounts.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then((account)=>{
            console.log(account)
            res.status(200).json({updatedAccount:account})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    transfer: async (req,res)=>{
        const sendingAccountString = `${req.body.sendAccountType}.currentBalance`
        const receivingAccountString = `${req.body.receiveAccountType}.currentBalance`
        let updatedSenderAccount = null
        await Accounts.findOneAndUpdate({_id:req.body.sendAccount},{ $inc:{[sendingAccountString]:-req.body.sendAmount} },{new:true})
        .then((account)=>{
            updatedSenderAccount=account
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
        Accounts.findOneAndUpdate({_id:req.body.receiveAccount},{ $inc:{[receivingAccountString]:req.body.sendAmount} },{new:true})
        .then((account)=>{
            res.status(200).json({updatedReceiverAccount:account, updatedSenderAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    // Delete
    delete:(req,res)=>{
        Accounts.findOneAndDelete({_id:req.params.id})
        .then((accounts)=>{
            res.status(200).json({deletedAccounts:accounts})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    }


}

module.exports=AccountsController