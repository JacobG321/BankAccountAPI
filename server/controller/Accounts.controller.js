const Accounts = require("../models/Accounts.model")
// need to access who the account owner is



const AccountsController = {

    // Create
    create:(req,res) =>{
        Accounts.create(req.body)
        .then((accounts)=>{
            res.status(201).json({accounts:accounts})
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
        .then((accounts)=>{
            res.status(200).json({updatedAccounts:accounts})
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