const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const eventItems = require("./routes/api/eventItems");
const userAuth = require("./routes/api/userAuth");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')

const app = express();
const PORT = 5000;
const uri = process.env.MONGODB_URI;

dotenv.config();

//Database connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);

// if(process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     })
// }

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


app.use(cookieParser());

app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

//Routes
app.use("/api/events/", eventItems);
app.use("/api/users", userAuth);

app.get("/", (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running...");
});
