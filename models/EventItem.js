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
    date: {
        type: Date,
        default: new Date(),
    }
})

module.exports = EventItem = mongoose.model('EventItem', eventItemSchema);module.exports = EventItem = mongoose.model('EventItem', eventItemSchema);