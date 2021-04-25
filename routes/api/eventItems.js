const express = require('express');
const router  = express.Router();

//Event Item Model
const EventItem = require('../../models/EventItem');

// @route GET api/events
// @desc Get all events json

router.get('/', (req, res)=> {
    EventItem.find()
        .then(events => res.json(events))
        .catch(err => console.log(err));
})

router.get('/category/:cat')

router.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const day = req.body.day;
    const time = req.body.time;
    const location = req.body.location;
    const categories = req.body.selectedCategories;
    const isPaid = req.body.isPaid;
    const price = req.body.price;

    console.log(req.body);


    const newEvent = new EventItem({
        title,
        description,
        day,
        time,
        location,
        categories,
        isPaid,
        price
    });


    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: '+ err));

})

module.exports = router;