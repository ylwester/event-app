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


/*
- Tytul wydarzenia
- Opis
- Data utworzenia
- Kiedy sie odbywa + godzina
- Miasto
- zdjecie???
- Kategoria (wybor)
- Autor (username)
*/

module.exports = EventItem = mongoose.model('EventItem', eventItemSchema);