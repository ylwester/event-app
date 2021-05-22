const {sign} = require('jsonwebtoken');

const createAccessToken = userId => {
    return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    })
}

const createRefreshToken = userId => {
    return sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
}

const sendAccessToken = (res, req, user, accesstoken) => {
    res.send({
        accesstoken,
        name: user.name,
        email: req.body.email,
    })
}

const sendRefreshToken = (res, token) => {
    res.cookie('refreshtoken', token, {
        httpOnly: true,
        path: '/api/users/refresh_token'
    })

}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken

}