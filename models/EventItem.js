const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create event schema
const eventItemSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
      type: String,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        latitude: Number,
        longitude: Number,
    },
    categories: [{
        name: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
        }
    }],
    paid: {
        type: Boolean,
    },
    price: {
        type: Number,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        required: false,
    }
})



module.exports = EventItem = mongoose.model('EventItem', eventItemSchema);