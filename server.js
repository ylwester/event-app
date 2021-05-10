const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventItems = require('./routes/api/eventItems');
const userAuth = require('./routes/api/userAuth')
const cors = require('cors');

const app = express();
const PORT = 5000;

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
app.use(cors());


app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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