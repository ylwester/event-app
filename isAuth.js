const { verify } = require('jsonwebtoken');

const isAuth = req => {
    const authorization = req.headers['x-access-token'];
    if(!authorization) throw new Error("Access denied");

    const token = authorization;
    const {userId} = verify(token, process.env.ACCESS_TOKEN_SECRET);
    return userId;
}

module.exports = {
    isAuth,
}