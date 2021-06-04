const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

//Event Item Model
const EventItem = require("../../models/EventItem");
const addEventValidation = require("../../addEventValidation");

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
  const title = req.body.title;
  const description = req.body.description;
  const day = req.body.day;
  const dayDate = req.body.day;
  const time = req.body.time;
  const street = req.body.street;
  const location = req.body.location;
  const categories = req.body.selectedCategories;
  const paid = req.body.paid;
  const price = req.body.price;
  let city;

  const handleAddress = (addr) => {
    console.log(addr)
    if (addr.city) {
      city = addr.city;
    } else if (addr.town) {
      city = addr.town;
    }
  };

  try {
    const { error } = addEventValidation(req.body);

    if (error) throw new Error(error.details[0].message);

    //Gets city from coordinates
    fetch(
        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        location.latitude +
        "&lon=" +
        location.longitude
    )
        .then(response =>
            response.json()
        )
        .then((data) => {
          handleAddress(data.address);

          const newEvent = new EventItem({
            title,
            author,
            description,
            day,
            dayDate,
            time,
            street,
            location,
            categories,
            paid,
            price,
            city,
          });


          newEvent
              .save()
              .then(() => res.json("Wydarzenie zostało dodane prawidłowo i oczekuje na akceptacje administratora"))
              .catch((err) => res.status(400).json("Error: " + err));

        });

  } catch (err) {
    res.status(400).send({
      error: `${err.message}`,
    });
  }
});

router.post("/accept/:id", function (req, res) {
  let id = req.params.id;
  EventItem.findByIdAndUpdate(
    id,
    {
      accepted: true,
    },
    function (err, docs) {
      if (err) {
        throw new Error(err);
      } else {
        res.send("Event " + id + " accepted")
      }
    }
  );
});

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;
  EventItem.findOneAndDelete({_id: id}, function (err, docs) {
    if(err){
      console.log(err)
      res.send("Not deleted, "+ err)
    }
    else {
      console.log("Event " + id + " deleted " + docs)
      res.send("Event " + id + " deleted");
    }
  });


})

module.exports = router;
