const jwt = require("jsonwebtoken");
const key = "First_Secret_Key"
const Customer = require('../models/Customer.model')

module.exports={
  
  authenticate: (req, res, next) => {
  jwt.verify(req.cookies.customerToken, key, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      req.Token = payload
      next();
    }
  })
  },

  isLoggedIn:(req, res) => {
    jwt.verify(req.cookies.customerToken, key, async (err, payload) => {
      if (err) { 
        res.status(401).json({verified: false});
      } else {
        const customer = await Customer.findOne({_id:payload.id})
        const {_id,username} = customer
        return res.json({customer:{id:_id,username:username}})
      }
    })
    },

}