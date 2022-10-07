const jwt = require("jsonwebtoken");
const Customer = require("../models/Customer.model")
const bcrypt = require('bcrypt')



const CustomerController = {

    // Create
    register: (req, res) => {
        Customer.create(req.body)
        .then((customer) => {
            const {_id,firstName,...other} = customer

            const customerToken = jwt.sign({
                id:customer._id
            },process.env.FIRST_SECRET_KEY)

            res.cookie('customertoken',customerToken,{
                httpOnly:true
            }).status(201).json({customer:{id:_id,name:firstName}})
        })
        .catch(err => res.json(err));
    },

    login:(req, res)=>{
        Customer.findOne({username:req.body.username})
        .then((customer)=>{
            const {_id,username,...other} = customer
            if(customer === null){
                res.status(400)
            }
            bcrypt.compare(req.body.password,customer.password)
            .then(()=>{
                const customerToken = jwt.sign({
                    id:customer._id
                },process.env.FIRST_SECRET_KEY)
                res.cookie('customertoken',customerToken,{
                    httpOnly:true
                }).json({customer:{id:_id,username:username}})
            })
            .catch(()=>{
                res.status(400)
            })
        })
        .catch((err)=>{
            res.status(400).json({msg:"something went wrong",error:err})
        })
    },
    logout: (req, res) => {
        res.clearCookie('customertoken');
        res.status(200).json({customer:"Logged Out"})
        },
        getAll:(req,res)=>{
            Customer.find({})
            .then((customer)=>{
                res.json(customer)
            })
            .catch((err)=>{
                console.log("error getting customers")
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