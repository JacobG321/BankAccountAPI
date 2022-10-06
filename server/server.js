const express = require('express');
const cors = require('cors')
const app = express();
// require('dotenv').config();
// const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

require('./config/mongoose.config');

require('./routes/Customer.routes')(app); 

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
// res.cookie("mycookie", "mydata", { httpOnly: true }).json({
//     message: "This response has a cookie"
//   });
// const myFirstSecret = process.env.FIRST_SECRET_KEY;

// const payload = {
//     id: customer._id
//   };

// const userToken = jwt.sign(payload, process.env.SECRET_KEY);
