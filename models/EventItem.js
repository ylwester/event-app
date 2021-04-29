const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create event schema
const eventItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    day: {
        type: Date,
        default: new Date(),
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
    }
})



module.exports = EventItem = mongoose.model('EventItem', eventItemSchema);