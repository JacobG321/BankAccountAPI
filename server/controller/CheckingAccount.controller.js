const CheckingAccount = require("../models/CheckingAccount.model")

const CheckingAccountController = {

    // Create
    create:(req,res) =>{
        CheckingAccount.create(req.body)
        .then((checkingAccount)=>{
            res.status(201).json({checkingAccount:checkingAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    getAll:(req,res) =>{
        CheckingAccount.find({})
        .then((checkingAccount)=>{
            res.status(200).json({checkingAccounts:checkingAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error", error:err})
        })
    },
    getOne:(req,res)=>{
        CheckingAccount.find({_id:req.params.id})
        .then((checkingAccount)=>{
            res.status(200).json({checkingAccount:checkingAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    },

    update:(req,res)=>{
        CheckingAccount.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then((checkingAccount)=>{
            res.status(200).json({updatedCheckingAccount:checkingAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    // Delete
    delete:(req,res)=>{
        CheckingAccount.findOneAndDelete({_id:req.params.id})
        .then((checkingAccount)=>{
            res.status(200).json({deletedCheckingAccount:checkingAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    }


}

module.exports=CheckingAccountController