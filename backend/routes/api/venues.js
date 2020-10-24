const express = require("express");
const router = express.Router();

const validateVenueInput = require("../../validation/venueValidator");

const Venue = require("../../models/Venue");

router.get("/venues", async (req,res) => {
    const venues = await Venue.find({});
    res.status(200).json({
     data: venues
    });
})

router.post("/newVenue", async (req, res) => {
    const { errors, isValid } = validateVenueInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
    Venue.findOne({name: req.body.name}).then(venue => {
        if(venue) {
            return res.status(400).json({ nombre: "Nombre ya existe" });
        } else {
            const newVenue = new Venue({
                name: req.body.name,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                postal_code: req.body.postal_code,
                floors: req.body.floors,
                sections: req.body.sections
                });
            console.log(newVenue)
            newVenue
            .save()
            .then(venue => res.json(venue))
            }
        })
    })

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        Venue.findByIdAndDelete(id)
        .then(venue => res.json(venue))
    } catch(e) {
        console.log("Error")
        return res.status(400).json({ error: "No se logró borrar el recinto" });
    }
})

module.exports = router;