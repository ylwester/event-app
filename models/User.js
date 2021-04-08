const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
})

module.exports = User = mongoose.model('user', userSchema);