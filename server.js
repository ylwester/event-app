const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

const eventItems = require('./routes/api/eventItems');

//Database URI
const uri = "mongodb+srv://sylwek:sylwek123@cluster0.iy16k.mongodb.net/eventapp?retryWrites=true&w=majority";

//Database connection
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(()=> console.log("MongoDB connected..."))
    .catch(err => console.log(err));

app.use(express.json());

//Routes
app.use('/api/events/', eventItems);


app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`);
})


app.listen(PORT, () => {
    console.log("Server is running...");
})