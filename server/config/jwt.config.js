const jwt = require("jsonwebtoken");
const key = process.env.FIRST_SECRET_KEY
const Customer = require('../models/Customer.model')

module.exports={
  
  authenticate: (req, res, next) => {
  // console.log(req.cookies.customertoken, "authy")
  jwt.verify(req.cookies.customertoken, key, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      req.Token = payload
      next();
    }
  })
  },

  isLoggedIn:(req, res) => {
    // console.log(req.cookies.customertoken,"loggedin")
    jwt.verify(req.cookies.customertoken, key, async (err, payload) => {
      if (err) {
        console.log(err, "err")
        res.status(401).json({verified: false});
      } else {
        const customer = await Customer.findOne({_id:payload.id})
        const {_id,username} = customer
        return res.json({customer:{id:_id,username:username}})
      }
    })
    },

}