const SavingsAccount = require("../models/savingsAccount.model")

const SavingsAccountController = {

    // Create
    create:(req,res) =>{
        SavingsAccount.create(req.body)
        .then((savingsAccount)=>{
            res.status(201).json({savingsAccount:savingsAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    getAll:(req,res) =>{
        SavingsAccount.find({})
        .then((savingsAccount)=>{
            res.status(200).json({savingsAccounts:savingsAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error", error:err})
        })
    },
    getOne:(req,res)=>{
        SavingsAccount.find({_id:req.params.id})
        .then((savingsAccount)=>{
            res.status(200).json({savingsAccount:savingsAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    },

    update:(req,res)=>{
        SavingsAccount.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then((savingsAccount)=>{
            res.status(200).json({updatedSavingsAccount:savingsAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    // Delete
    delete:(req,res)=>{
        SavingsAccount.findOneAndDelete({_id:req.params.id})
        .then((savingsAccount)=>{
            res.status(200).json({deletedSavingsAccount:savingsAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    }


}

module.exports=SavingsAccountController