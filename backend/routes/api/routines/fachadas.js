const express = require("express");
const router = express.Router();

const validateFachada = require("../../../validation/routines/fachadaValidator");
const Fachada = require("../../../models/Routines/Fachada");

router.get("/", async (req,res) => {
    const fachadas = await Fachada.find({});
    res.status(200).json({
     data: fachadas
    });
})

router.get("/:id", async (req,res) => {
    const id = req.params.id;
    const fachada = await Fachada.findById(id);
    res.status(200).json({
     data: fachada
    });
})

router.post("/newFachada", async (req, res) => {
    const { errors, isValid } = validateFachada(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newRoutine = new Fachada({
        fecha: req.body.fecha,
        ejecutor: req.body.ejecutor,
        supervisor: req.body.supervisor,
        blower: req.body.blower,
        fuga_espirotubo: req.body.fuga_espirotubo,
        presion_sensor: req.body.presion_sensor,
        presion_alta: req.body.presion_alta,
        presion_baja: req.body.presion_baja,
        colchones: req.body.colchones,
        defecto_colchones: req.body.defecto_colchones,
        generador_aire: req.body.generador_aire,
        lamparas: req.body.lamparas,
        defecto_lamparas: req.body.defecto_lamparas,
        control: req.body.control,
        tablero_electrico: req.body.tablero_electrico,
        observacion: req.body.observacion
        });
    console.log(newRoutine)
    newRoutine
    .save()
    .then(fachada => res.json(fachada))
})

module.exports = router;