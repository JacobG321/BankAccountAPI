const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// config
require('./config/mongoose.config');

// routes
require('./routes/Customer.routes')(app);
require('./routes/Accounts.routes')(app);

const server = app.listen(port,()=>{console.log(`server working on port ${port}`)})

