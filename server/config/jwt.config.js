const jwt = require("jsonwebtoken");
const key = process.env.FIRST_SECRET_KEY
const Customer = require('../models/Customer.model')

module.exports={
  
  authenticate: (req, res, next) => {
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
    console.log(req.cookies)
    jwt.verify(req.cookies.customertoken, key, async (err, payload) => {
      if (err) {
        console.log(err, "err")
        // console.log(req.cookies, "cookies")
        // console.log(key, "key")
        // console.log(req.cookies.customerToken, "customertoken")
        res.status(401).json({verified: false});
      } else {
        console.log('doing a thing')
        const customer = await Customer.findOne({_id:payload.id})
        const {_id,username} = customer
        return res.json({customer:{id:_id,username:username}})
      }
    })
    },

}