const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//Event Item Model
const EventItem = require("../../models/EventItem");

// @route GET api/events
// @desc Get all events json

function getTodayDateToInput() {
  let tempDate = new Date();
  let dd = tempDate.getDate();
  let mm = tempDate.getMonth() + 1;
  let yyyy = tempDate.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return yyyy + "-" + mm + "-" + dd;
}

router.get("/", (req, res) => {
  const { category, paid, day } = req.query;

  const todayDate = getTodayDateToInput();

  let find = {};

  //Get events that are up to date
  find = { ...find, dayDate: { $gte: todayDate } };

  find = category ? { ...find, "categories.id": category } : find;
  find = paid ? { ...find, paid: paid } : find;
  find = day ? { ...find, day: day } : find;

  EventItem.find(find)
    .sort({ day: 1 })
    .then((events) => res.json(events))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const author = req.body.author;
  console.log(author);
  const title = req.body.title;
  const description = req.body.description;
  const day = req.body.day;
  const dayDate = req.body.day;
  const time = req.body.time;
  const location = req.body.location;
  const categories = req.body.selectedCategories;
  const paid = req.body.paid;
  const price = req.body.price;
  let city;

  const handleAddress = (addr) => {
    if (addr.city) {
      city = addr.city;
    } else if (addr.town) {
      city = addr.town;
    }

    const newEvent = new EventItem({
      title,
      author,
      description,
      day,
      dayDate,
      time,
      location,
      categories,
      paid,
      price,
      city,
    });

    newEvent
      .save()
      .then(() => res.json("Event added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  };

  //Gets city from coordinates
  fetch(
    "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
      location.latitude +
      "&lon=" +
      location.longitude
  )
    .then((response) => response.json())
    .then((data) => handleAddress(data.address));
});

// router.get("/:id", function (req, res) {
//   EventItem.findById(req.params.id)
//     .then((events) => res.json(events))
//     .catch((err) => console.log(err));
// });

router.post("/accept/:id", function (req, res) {
    let updateResult;
    console.log(req.params.id);
  EventItem.findByIdAndUpdate(req.params.id, {
      accepted: true
  }, function (err, docs) {
      if(err) {
          throw new Error(err);
      } else {
          updateResult = docs;
          console.log("Updated user: ", docs)
      }
  });

  res.send(updateResult);
});

module.exports = router;
