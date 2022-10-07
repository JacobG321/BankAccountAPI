const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const socket = require('socket.io')
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// config
require('./config/mongoose.config');

// models

// routes
require('./routes/Customer.routes')(app);
require('./routes/CheckingAccount.routes')(app);

const server = app.listen(port,()=>{console.log(`server working on port ${port}`)})






const io = socket(server,{
    cors:{
        origin: "http://localhost:3000",
        credentials:true
    }
})

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    socket.on("event_from_client", async () => {
        const data = await Customer.find({}) //changes needed
        socket.emit("answer_from_server", data );
    });
    socket.on("account_created",()=>{
        socket.emit
    })
});