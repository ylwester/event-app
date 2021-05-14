const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const { registerValidation, loginValidation } = require("../../authValidation");
const bcrypt = require("bcryptjs");

//Register
router.post("/register", cors(), async (req, res) => {
  //Validate sent data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //Check if username in DB
  const usernameExist = await User.findOne({ email: req.body.name });
  if (usernameExist)
    return res.status(400).send("Nazwa użytkownika jest już zajęta");

  //Check if email in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Konto z tym adresem email już istnieje");

  //Encrypt passwords
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);

  //Create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
  });

  try {
    const savedUser = await user.save().then((user) => {
      jwt.sign(
        {
          _id: user._id,
        },
        process.env.TOKEN_SECRET,
          {expiresIn: 3600},
          (err, token) => {
              if(err) throw err;
            res.json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
          }
      );
    });
    res.status(200).send(savedUser);
  } catch (err) {
    res.send(400).send(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or password is wrong");

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: 3600,
  });

  res.header("x-access-token", token).send({token, user});
});

module.exports = router;
