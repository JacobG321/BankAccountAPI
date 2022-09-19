const Customer = require("../models/Customer.model")

const CustomerController = {

    // Create
    create:(req,res) =>{
        Customer.create(req.body)
        .then((customer)=>{
            res.status(201).json({customer:customer})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    getAll:(req,res) =>{
        Customer.find({})
        .then((customer)=>{
            res.status(200).json({customers:customer})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error", error:err})
        })
    },
    getOne:(req,res)=>{
        Customer.find({_id:req.params.id})
        .then((customer)=>{
            res.status(200).json({customer:customer})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    },

    update:(req,res)=>{
        Customer.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
        .then((customer)=>{
            res.status(200).json({updatedCustomer:customer})
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    // Delete
    delete:(req,res)=>{
        Customer.findOneAndDelete({_id:req.params.id})
        .then((customer)=>{
            res.status(200).json({deletedCustomer:customer})
        })
        .catch((err)=>{
            res.status(500).json({message:"There has been an error",error:err})
        })
    }


}

module.exports=CustomerController