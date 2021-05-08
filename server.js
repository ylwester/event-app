const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = 5000;

const eventItems = require('./routes/api/eventItems');
const userAuth = require('./routes/api/userAuth')


dotenv.config();

//Database connection
mongoose
    .connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(()=> console.log("MongoDB connected..."))
    .catch(err => console.log(err));

app.use(express.json());

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

//Routes
app.use('/api/events/', eventItems);

app.use('/api/users', userAuth)




app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);
})


app.listen(PORT, () => {
    console.log("Server is running...");
})