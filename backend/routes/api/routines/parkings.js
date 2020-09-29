const express = require("express");
const router = express.Router();

const validateParking = require("../../../validation/routines/parkingValidator");
const Parking = require("../../../models/Routines/Parking");

router.get("/", async (req,res) => {
    const rutinas = await Parking.find({});
    res.status(200).json({
     data: rutinas
    });
})

router.get("/:id", async (req,res) => {
    try{
        const id = req.params.id;
        const rutina = await Parking.findById(id);
        console.log(rutina)
        if(!rutina) return next(new Error("No existe la rutina"));
        res.status(200).json({
            data: rutina
        })
    }
    catch (e) {
        next(e);
    }
})

router.post("/newParking", async (req, res) => {
    const { errors, isValid } = validateParking(req.body);
    console.log(errors)
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const total_carros = parseInt(req.body.carros_n1) + parseInt(req.body.carros_n2) + parseInt(req.body.carros_n3) + parseInt(req.body.carros_n4);
    const total_motos = parseInt(req.body.motos_n1) + parseInt(req.body.motos_n2) + parseInt(req.body.motos_n3) + parseInt(req.body.motos_n4);
    const total_camaras = parseInt(req.body.camaras_n1) + parseInt(req.body.camaras_n2) + parseInt(req.body.camaras_n3) + parseInt(req.body.camaras_n4) + parseInt(req.body.camaras_ptz);
    const newRoutine = new Parking({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        supervisor: req.body.supervisor,
        carros_n1: req.body.carros_n1, 
        carros_n2: req.body.carros_n2, 
        carros_n3: req.body.carros_n3, 
        carros_n4: req.body.carros_n4, 
        carros: total_carros, 
        motos_n1: req.body.motos_n1,
        motos_n2: req.body.motos_n2,
        motos_n3: req.body.motos_n3,
        motos_n4: req.body.motos_n4,
        motos: total_motos,
        camaras_n1: req.body.camaras_n1,
        camaras_n2: req.body.camaras_n2,
        camaras_n3: req.body.camaras_n3,
        camaras_n4: req.body.camaras_n4,
        camaras_ptz: req.body.camaras_ptz,
        camaras: total_camaras,
        observacion: req.body.observacion
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(routine => res.json(routine))
})

module.exports = router;