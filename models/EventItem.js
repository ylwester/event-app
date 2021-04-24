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
    categories: {
        type: Array,
        required: true,
    },
    isPaid: {
        type: Boolean,
    },
    price: {
        type: Number,
    }
})



module.exports = EventItem = mongoose.model('EventItem', eventItemSchema);