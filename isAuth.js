const { verify } = require('jsonwebtoken');

const isAuth = req => {
    const authorization = req.headers['authorization'];
    if(!authorization) throw new Error("You need to login");

    const token = authorization;
    const {userId} = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userId;
}

module.exports = {
    isAuth,
}