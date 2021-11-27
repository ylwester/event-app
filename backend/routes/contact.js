const express = require("express");
const router = express.Router();
const contactValidation = require("../contactValidation");
const nodemailer = require('nodemailer');


router.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    try {
        const { error } = contactValidation(req.body);
        if (error) throw new Error(error.details[0].message);

        console.log(email);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sylwesterevetnapp@gmail.com',
                pass: 'sylwek123',
            }
        });

        const mailOptions = {
            from: email,
            to: 'sylwesterevetnapp@gmail.com',
            subject: 'EventAPP Contact',
            text: "Imie nadawcy: "+ name +"\nFrom: " + email + "\n" + message
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                res.json("Nie udało się wysłąć maila.")
            } else {
                res.json("Email został wysłany.")
            }
        });

    } catch (err) {
        res.status(400).send({
            error: `${err.message}`
        });
    }

})

module.exports = router;