const CreditAccount = require("../models/CreditAccount.model")

const CreditAccountController = {

    // Create
    create:(req,res) =>{
        CreditAccount.create(req.body)
        .then((creditAccount)=>{
            res.status(201).json({creditAccount:creditAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    getAll:(req,res) =>{
        CreditAccount.find({})
        .then((creditAccount)=>{
            res.status(200).json({creditAccounts:creditAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error", error:err})
        })
    },
    getOne:(req,res)=>{
        CreditAccount.find({_id:req.params.id})
        .then((creditAccount)=>{
            res.status(200).json({creditAccount:creditAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    },

    update:(req,res)=>{
        CreditAccount.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then((creditAccount)=>{
            res.status(200).json({updatedcreditAccount:creditAccount})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    // Delete
    delete:(req,res)=>{
        CreditAccount.findOneAndDelete({_id:req.params.id})
        .then((creditAccount)=>{
            res.status(200).json({deletedCreditAccount:creditAccount})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    }


}

module.exports=CreditAccountController