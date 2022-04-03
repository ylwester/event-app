const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const {verify} = require("jsonwebtoken");

const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../../tokens");

const { registerValidation, loginValidation } = require("../../validations/authValidation");
const bcrypt = require("bcryptjs");

//Register
router.post("/register", async (req, res) => {

  try {
  //Validate sent data
  const { error } = registerValidation(req.body);
  if (error) throw new Error(error.details[0].message);

  //Check if username in DB
  const usernameExist = await User.findOne({ name: req.body.name });
  if (usernameExist) throw new Error("Nazwa użytkownika jest już zajęta");

  //Check if email in DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) throw new Error("Konto z tym adresem email już istnieje");

  //Encrypt passwords
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);

  //Create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
  });


    const savedUser = await user.save()
        .then(() => res.json("Konto zostało założone, możesz się zalogować."))
        .catch((err) => res.status(400).json("Error: " + err));

  } catch (err) {
    res.status(400).send({
      error: `${err.message}`
    });
  }
});

//Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  try {
  if (error) throw new Error(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("Nieprawidłowy email lub hasło");

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) throw new Error("Nieprawidłowe hasło");

    //Create access and refresh token
    const accesstoken = createAccessToken(user._id);
    const refreshtoken = createRefreshToken(user._id);

    //Put refresh token in DB
    user.refreshToken = refreshtoken;
    user.save();

    //Send token, refresh as a cookie, access as response.
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, user, accesstoken);

  } catch (err) {
    res.status(400).send({
      error: `${err.message}`
    });
  }
});

//Logout user
router.post('/logout', (_req, res) => {
  res.clearCookie('refreshtoken', {path: '/api/users/refresh_token'});
  return res.send({
    message: 'Logged out',
  })
})


//Refresh token
router.post('/refresh_token', async(req, res) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.send({accesstoken: ''});
  let payload = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

  } catch (err) {
    return res.send({accesstoken: ''});
  }

  //Token is valid, check if user exists
  const user = await User.findOne({_id: payload.userId});
  if(!user) return res.send({accesstoken: ''});

  if(user.refreshToken !== token) {
    return res.send({accesstoken: ''});
  }

  //Create new refresh and access token
  const accesstoken = createAccessToken(user._id);
  const refreshtoken = createRefreshToken(user._id);

  user.refreshToken = refreshtoken;
  user.save();
  sendRefreshToken(res, refreshtoken);
  res.send({
    accesstoken: accesstoken,
    name: user.name,
    role: user.role
  })
})

module.exports = router;
